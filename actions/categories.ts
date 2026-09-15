"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function addCategory(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Please provide a category name.");

  await prisma.category.create({
    data: { name, userId: session.user.id },
  });

  revalidatePath("/dashboard");
  revalidatePath("/transactions");
  revalidatePath("/profile/categories");
}

export async function updateCategory(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();

  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.user.id) {
    throw new Error("Not found or unauthorized");
  }

  if (!name) throw new Error("Please provide a category name.");

  await prisma.category.update({ where: { id }, data: { name } });

  revalidatePath("/dashboard");
  revalidatePath("/transactions");
  revalidatePath("/profile/categories");
}

export async function deleteCategory(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const id = String(formData.get("id") ?? "");
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.user.id) {
    throw new Error("Not found or unauthorized");
  }

  await prisma.category.delete({ where: { id } });

  revalidatePath("/dashboard");
  revalidatePath("/transactions");
  revalidatePath("/profile/categories");
}
