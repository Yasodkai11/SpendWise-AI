import { prisma } from "@/lib/prisma";
import { updateTransaction } from "@/actions/transactions";
import DeleteTransactionButton from "@/components/transactions/delete-transaction-button";
import Card from "@/components/ui/card";
import Link from "next/link";

type TransactionListProps = {
  userId: string;
  searchParams?: Record<string, string | string[] | undefined>;
};

function getParamValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export async function TransactionList({
  userId,
  searchParams = {},
}: TransactionListProps) {
  const search = getParamValue(searchParams.search).trim();
  const typeFilter = getParamValue(searchParams.type) as
    | "INCOME"
    | "EXPENSE"
    | "";
  const category = getParamValue(searchParams.category).trim();
  const fromDate = getParamValue(searchParams.fromDate);
  const toDate = getParamValue(searchParams.toDate);
  const page = Number(getParamValue(searchParams.page) || "1");
  const pageSize = 6;

  const where: {
    userId: string;
    OR?: Array<Record<string, unknown>>;
    type?: "INCOME" | "EXPENSE";
    category?: Record<string, unknown>;
    date?: Record<string, Date>;
  } = { userId };

  if (search) {
    where.OR = [
      { category: { contains: search, mode: "insensitive" } },
      { note: { contains: search, mode: "insensitive" } },
    ];
  }

  if (typeFilter) {
    where.type = typeFilter;
  }

  if (category) {
    where.category = { contains: category, mode: "insensitive" };
  }

  if (fromDate || toDate) {
    where.date = {};
    if (fromDate) {
      where.date.gte = new Date(fromDate);
    }
    if (toDate) {
      where.date.lte = new Date(toDate);
    }
  }

  const [total, transactions] = await Promise.all([
    prisma.transaction.count({ where }),
    prisma.transaction.findMany({
      where,
      orderBy: { date: "desc" },
      skip: ((Number.isFinite(page) ? page : 1) - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const buildHref = (nextPage: number) => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (typeFilter) params.set("type", typeFilter);
    if (category) params.set("category", category);
    if (fromDate) params.set("fromDate", fromDate);
    if (toDate) params.set("toDate", toDate);
    params.set("page", String(nextPage));

    return `?${params.toString()}`;
  };

  return (
    <Card className="overflow-hidden">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">
            Recent transactions
          </h2>
          <p className="text-sm text-text-secondary">{total} entries found</p>
        </div>

        <form className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <input
            name="search"
            defaultValue={search}
            placeholder="Search"
            className="rounded-xl border border-border-light bg-white px-3 py-2 text-sm text-text-primary shadow-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
          />
          <select
            name="type"
            defaultValue={typeFilter}
            className="rounded-xl border border-border-light bg-white px-3 py-2 text-sm text-text-primary shadow-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
          >
            <option value="">All types</option>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>
          <input
            name="category"
            defaultValue={category}
            placeholder="Category"
            className="rounded-xl border border-border-light bg-white px-3 py-2 text-sm text-text-primary shadow-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
          />
          <input
            type="date"
            name="fromDate"
            defaultValue={fromDate}
            className="rounded-xl border border-border-light bg-white px-3 py-2 text-sm text-text-primary shadow-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
          />
          <input
            type="date"
            name="toDate"
            defaultValue={toDate}
            className="rounded-xl border border-border-light bg-white px-3 py-2 text-sm text-text-primary shadow-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
          />

          <div className="md:col-span-2 xl:col-span-5 flex gap-3">
            <button
              type="submit"
              className="rounded-xl bg-linear-to-r from-primary-600 to-primary-700 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-primary-200/60 hover:from-primary-700 hover:to-primary-800"
            >
              Apply filters
            </button>
            <Link
              href="/transactions"
              className="inline-flex items-center justify-center rounded-xl border border-primary-200 bg-white px-4 py-2 text-sm font-medium text-primary-700 shadow-sm hover:bg-primary-50"
            >
              Reset
            </Link>
          </div>
        </form>
      </div>

      <div className="space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="rounded-3xl border border-border-light bg-white p-4 shadow-lg shadow-primary-100/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-text-primary">{tx.category}</p>
                <p className="text-sm text-text-secondary">
                  {tx.note || "No note"}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={
                    tx.type === "INCOME"
                      ? "font-semibold text-emerald-600"
                      : "font-semibold text-rose-600"
                  }
                >
                  {tx.type === "INCOME" ? "+" : "-"} Rs. {tx.amount}
                </p>
                <p className="text-xs text-text-tertiary">
                  {new Date(tx.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <details className="mt-4 border-t border-border-light pt-3">
              <summary className="cursor-pointer text-sm text-text-secondary">
                Edit / Actions
              </summary>

              <form action={updateTransaction} className="mt-3 space-y-3">
                <input name="id" type="hidden" defaultValue={tx.id} />

                <div className="grid gap-2 md:grid-cols-2">
                  <input
                    name="amount"
                    type="number"
                    step="0.01"
                    defaultValue={String(tx.amount)}
                    className="rounded-xl border border-border-light bg-white px-3 py-2 text-sm text-text-primary shadow-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
                    required
                  />

                  <select
                    name="type"
                    defaultValue={tx.type}
                    className="rounded-xl border border-border-light bg-white px-3 py-2 text-sm text-text-primary shadow-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
                    required
                  >
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                  </select>
                </div>

                <input
                  name="category"
                  defaultValue={tx.category}
                  className="w-full rounded-xl border border-border-light bg-white px-3 py-2 text-sm text-text-primary shadow-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
                  required
                />

                <input
                  name="date"
                  type="date"
                  defaultValue={new Date(tx.date).toISOString().slice(0, 10)}
                  className="w-full rounded-xl border border-border-light bg-white px-3 py-2 text-sm text-text-primary shadow-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
                  required
                />

                <textarea
                  name="note"
                  defaultValue={tx.note ?? ""}
                  className="w-full rounded-xl border border-border-light bg-white px-3 py-2 text-sm text-text-primary shadow-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
                />

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="rounded-xl bg-linear-to-r from-primary-600 to-primary-700 px-3 py-2 text-sm font-medium text-white shadow-lg shadow-primary-200/60 hover:from-primary-700 hover:to-primary-800"
                  >
                    Save
                  </button>
                </div>
              </form>

              <div className="mt-3">
                <DeleteTransactionButton id={tx.id} />
              </div>
            </details>
          </div>
        ))}

        {transactions.length === 0 && (
          <p className="rounded-xl border border-dashed border-border-light bg-white/80 p-4 text-sm text-text-secondary">
            No transactions match your filters.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-border-light pt-4">
          <Link
            href={buildHref(Math.max(1, currentPage - 1))}
            className={`rounded-xl border px-3 py-2 text-sm ${currentPage === 1 ? "pointer-events-none opacity-50" : "border-primary-200 bg-white hover:bg-primary-50"}`}
          >
            Previous
          </Link>

          <span className="text-sm text-text-secondary">
            Page {currentPage} of {totalPages}
          </span>

          <Link
            href={buildHref(Math.min(totalPages, currentPage + 1))}
            className={`rounded-xl border px-3 py-2 text-sm ${currentPage === totalPages ? "pointer-events-none opacity-50" : "border-primary-200 bg-white hover:bg-primary-50"}`}
          >
            Next
          </Link>
        </div>
      )}
    </Card>
  );
}
