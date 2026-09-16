import { saveBudget } from "@/actions/transactions";
import Card from "@/components/ui/card";
import type { Budget } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function BudgetCard({
  category,
  spent,
  budget,
}: {
  category: string;
  spent: number;
  budget: number;
}) {
  const percentage = budget > 0 ? (spent / budget) * 100 : 0;
  const isWarning = percentage >= 80;
  const isOver = percentage > 100;

  return (
    <div className="rounded-2xl border border-border-light bg-bg-secondary p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-text-primary">{category}</h4>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            isOver
              ? "bg-danger-50 text-danger-700"
              : isWarning
                ? "bg-warning-50 text-warning-700"
                : "bg-success-50 text-success-700"
          }`}
        >
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div className="space-y-2">
        <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
          <div
            className={`h-full transition-all duration-300 ${
              isOver
                ? "bg-danger-500"
                : isWarning
                  ? "bg-warning-500"
                  : "bg-success-500"
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Spent: {formatCurrency(spent)}</span>
          <span>Budget: {formatCurrency(budget)}</span>
        </div>
      </div>
    </div>
  );
}

export default async function BudgetPanel({ userId }: { userId: string }) {
  const currentMonth = monthKey(new Date());
  const monthDate = new Date();
  const startOfMonth = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth(),
    1,
  );
  const endOfMonth = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth() + 1,
    1,
  );

  const [budgets, spendingByCategory]: [
    Budget[],
    { category: string; _sum: { amount: number | null } }[],
  ] = await Promise.all([
    prisma.budget.findMany({
      where: {
        userId,
        month: currentMonth,
      },
      orderBy: {
        category: "asc",
      },
    }),
    prisma.transaction.groupBy({
      by: ["category"],
      where: {
        userId,
        type: "EXPENSE",
        date: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
      _sum: {
        amount: true,
      },
    }),
  ]);

  const spendMap = new Map(
    spendingByCategory.map((item) => [
      item.category,
      Number(item._sum.amount ?? 0),
    ]),
  );

  return (
    <Card className="h-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          Monthly Budgets
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Set and monitor your spending budgets for{" "}
          {new Date().toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Add Budget Form */}
      <form
        action={saveBudget}
        className="mb-6 space-y-3 rounded-2xl border border-border-light bg-bg-secondary p-4 shadow-sm"
      >
        <input type="hidden" name="month" value={currentMonth} />
        <div className="grid grid-cols-[1fr_1.2fr_auto] gap-3">
          <Input
            name="category"
            placeholder="Category"
            defaultValue=""
            required
          />
          <Input
            name="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="Budget amount"
            required
          />
          <Button type="submit" size="md">
            Add
          </Button>
        </div>
      </form>

      {/* Budgets List */}
      <div className="space-y-3">
        {budgets.length > 0 ? (
          budgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              category={budget.category}
              spent={spendMap.get(budget.category) || 0}
              budget={budget.amount}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-text-secondary">No budgets set yet</p>
            <p className="text-xs text-text-tertiary mt-1">
              Create your first budget to track spending
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
