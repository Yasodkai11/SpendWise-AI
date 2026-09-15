"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

function sanitizeCategory(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function normalizeMonth(value?: FormDataEntryValue | null) {
  const input = String(value ?? "");
  if (input) return input;
  return new Date().toISOString().slice(0, 7);
}

export async function addTransaction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const amountRaw = Number(formData.get("amount"));
  const category = sanitizeCategory(formData.get("category"));
  const note = String(formData.get("note") ?? "").trim();
  const dateValue = String(formData.get("date") ?? "");
  const type = formData.get("type") as "INCOME" | "EXPENSE";

  if (!category || !Number.isFinite(amountRaw) || amountRaw <= 0 || !dateValue) {
    throw new Error("Please provide valid transaction details.");
  }

  await prisma.transaction.create({
    data: {
      amount: amountRaw,
      type,
      category,
      note: note || null,
      date: new Date(dateValue),
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/transactions");
}

export async function updateTransaction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;
  const amountRaw = Number(formData.get("amount"));
  const category = sanitizeCategory(formData.get("category"));
  const note = String(formData.get("note") ?? "").trim();
  const dateValue = String(formData.get("date") ?? "");
  const type = formData.get("type") as "INCOME" | "EXPENSE";

  const existing = await prisma.transaction.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.user.id) {
    throw new Error("Not found or unauthorized");
  }

  if (!category || !Number.isFinite(amountRaw) || amountRaw <= 0 || !dateValue) {
    throw new Error("Please provide valid transaction details.");
  }

  await prisma.transaction.update({
    where: { id },
    data: {
      amount: amountRaw,
      type,
      category,
      note: note || null,
      date: new Date(dateValue),
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/transactions");
}

export async function deleteTransaction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;
  const existing = await prisma.transaction.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.user.id) {
    throw new Error("Not found or unauthorized");
  }

  await prisma.transaction.delete({ where: { id } });

  revalidatePath("/dashboard");
  revalidatePath("/transactions");
}

export async function saveBudget(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const category = sanitizeCategory(formData.get("category"));
  const amountRaw = Number(formData.get("amount"));
  const month = normalizeMonth(formData.get("month"));

  if (!category || !Number.isFinite(amountRaw) || amountRaw <= 0) {
    throw new Error("Please provide a valid category and monthly budget.");
  }

  await prisma.budget.upsert({
    where: {
      userId_category_month: {
        userId: session.user.id,
        category,
        month,
      },
    },
    update: {
      amount: amountRaw,
    },
    create: {
      userId: session.user.id,
      category,
      amount: amountRaw,
      month,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/transactions");
}
