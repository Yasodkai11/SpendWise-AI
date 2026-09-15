import { addTransaction } from "@/actions/transactions";
import Card from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function TransactionForm({ userId }: { userId: string }) {
  const categories = await prisma.category.findMany({
    where: { userId },
    orderBy: { name: "asc" },
  });

  return (
    <Card className="h-full">
      <form action={addTransaction} className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Quick entry</p>
            <h2 className="text-xl font-semibold text-text-primary">
              Add transaction
            </h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="amount"
              className="text-sm font-medium text-text-primary"
            >
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="w-full rounded-xl border border-border-light bg-white px-3 py-2.5 text-text-primary shadow-sm outline-none placeholder:text-text-tertiary focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="type"
              className="text-sm font-medium text-text-primary"
            >
              Type
            </label>
            <select
              id="type"
              name="type"
              className="w-full rounded-xl border border-border-light bg-white px-3 py-2.5 text-text-primary shadow-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
              required
            >
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="date"
              className="text-sm font-medium text-text-primary"
            >
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              className="w-full rounded-xl border border-border-light bg-white px-3 py-2.5 text-text-primary shadow-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="category"
              className="text-sm font-medium text-text-primary"
            >
              Category
            </label>
            <input
              id="category"
              name="category"
              list="category-options"
              placeholder="Food, Bills, Salary..."
              className="w-full rounded-xl border border-border-light bg-white px-3 py-2.5 text-text-primary shadow-sm outline-none placeholder:text-text-tertiary focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
              required
            />
            <datalist id="category-options">
              {categories.map((option) => (
                <option key={option.id} value={option.name} />
              ))}
            </datalist>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="note"
              className="text-sm font-medium text-text-primary"
            >
              Note
            </label>
            <textarea
              id="note"
              name="note"
              rows={3}
              placeholder="Optional note"
              className="w-full rounded-xl border border-border-light bg-white px-3 py-2.5 text-text-primary shadow-sm outline-none placeholder:text-text-tertiary focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-linear-to-r from-primary-600 to-primary-700 px-4 py-2.5 font-medium text-white shadow-lg shadow-primary-200/60 transition hover:from-primary-700 hover:to-primary-800"
        >
          Save transaction
        </button>
      </form>
    </Card>
  );
}
