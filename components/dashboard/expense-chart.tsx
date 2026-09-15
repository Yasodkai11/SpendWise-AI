import { prisma } from "@/lib/prisma";
import Card from "@/components/ui/card";

function monthLabel(date: Date) {
  return date.toLocaleString("en-US", { month: "short" });
}

export async function ExpenseChart({ userId }: { userId: string }) {
  const now = new Date();
  const months: { label: string; start: Date; end: Date }[] = [];

  for (let index = 5; index >= 0; index -= 1) {
    const start = new Date(now.getFullYear(), now.getMonth() - index, 1);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 1);
    months.push({ label: monthLabel(start), start, end });
  }

  const transactionWindow = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: months[0].start,
      },
    },
  });

  const totals = months.map((month) => {
    const monthTransactions = transactionWindow.filter(
      (transaction) =>
        transaction.date >= month.start && transaction.date < month.end,
    );

    return {
      label: month.label,
      income: monthTransactions
        .filter((transaction) => transaction.type === "INCOME")
        .reduce((sum, transaction) => sum + transaction.amount, 0),
      expense: monthTransactions
        .filter((transaction) => transaction.type === "EXPENSE")
        .reduce((sum, transaction) => sum + transaction.amount, 0),
    };
  });

  const max = Math.max(
    ...totals.flatMap((item) => [item.income, item.expense]),
    1,
  );

  return (
    <Card className="h-full">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-text-secondary">Performance</p>
          <h3 className="text-xl font-semibold text-text-primary">
            Last 6 months
          </h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox="0 0 600 180" className="min-w-[540px] w-full">
          {totals.map((item, index) => {
            const groupWidth = 600 / totals.length;
            const barWidth = 22;
            const x = index * groupWidth + 30;
            const incomeHeight = (item.income / max) * 110;
            const expenseHeight = (item.expense / max) * 110;
            const baseY = 150;

            return (
              <g key={item.label}>
                <rect
                  x={x}
                  y={baseY - incomeHeight}
                  width={barWidth}
                  height={incomeHeight}
                  rx={8}
                  fill="#059669"
                  opacity={0.9}
                />
                <rect
                  x={x + 28}
                  y={baseY - expenseHeight}
                  width={barWidth}
                  height={expenseHeight}
                  rx={8}
                  fill="#e11d48"
                  opacity={0.9}
                />
                <text
                  x={x + 28}
                  y={170}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#475569"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex items-center gap-5 text-sm text-text-secondary">
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-6 rounded-full bg-emerald-600" />{" "}
          Income
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-6 rounded-full bg-rose-600" />{" "}
          Expenses
        </div>
      </div>
    </Card>
  );
}

export default ExpenseChart;
