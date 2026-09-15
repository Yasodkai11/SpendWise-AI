import Card from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { IconTrendingUp, IconTrendingDown } from "@/components/ui/icons";

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  trend?: "up" | "down";
}

export function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <Card className="h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="rounded-2xl bg-primary-50 p-2.5 ring-1 ring-primary-100">
          {icon}
        </div>
        {trend && change !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold ${
              trend === "up" ? "text-success-600" : "text-danger-600"
            }`}
          >
            {trend === "up" ? (
              <IconTrendingUp size={16} />
            ) : (
              <IconTrendingDown size={16} />
            )}
            {Math.abs(change).toFixed(1)}%
          </div>
        )}
      </div>
      <p className="mb-2 text-sm text-text-secondary">{title}</p>
      <h3 className="text-2xl font-bold text-text-primary">{value}</h3>
    </Card>
  );
}

export async function StatCards({ userId }: { userId: string }) {
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });

  // Get previous month transactions for comparison
  const currentDate = new Date();
  const previousMonthStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1,
  );
  const currentMonthStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );

  const previousMonthTransactions = transactions.filter((t) => {
    const txDate = new Date(t.date);
    return txDate >= previousMonthStart && txDate < currentMonthStart;
  });

  const currentMonthTransactions = transactions.filter((t) => {
    const txDate = new Date(t.date);
    return txDate >= currentMonthStart;
  });

  // Current month
  const currentIncome = currentMonthTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const currentExpenses = currentMonthTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const currentBalance = currentIncome - currentExpenses;

  // Previous month
  const previousIncome = previousMonthTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const previousExpenses = previousMonthTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const previousBalance = previousIncome - previousExpenses;

  // Calculate trends
  const balanceTrend =
    previousBalance > 0
      ? ((currentBalance - previousBalance) / previousBalance) * 100
      : 0;
  const incomeTrend =
    previousIncome > 0
      ? ((currentIncome - previousIncome) / previousIncome) * 100
      : 0;
  const expenseTrend =
    previousExpenses > 0
      ? ((currentExpenses - previousExpenses) / previousExpenses) * 100
      : 0;

  const allTimeIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const allTimeExpenses = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const allTimeBalance = allTimeIncome - allTimeExpenses;

  const cards = [
    {
      title: "Total Balance",
      value: formatCurrency(allTimeBalance),
      change: balanceTrend,
      trend: balanceTrend >= 0 ? "up" : "down",
      icon: (
        <svg
          className="h-6 w-6 text-primary-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Monthly Income",
      value: formatCurrency(currentIncome),
      change: incomeTrend,
      trend: incomeTrend >= 0 ? "up" : "down",
      icon: (
        <svg
          className="h-6 w-6 text-success-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
    },
    {
      title: "Monthly Expenses",
      value: formatCurrency(currentExpenses),
      change: expenseTrend,
      trend: expenseTrend >= 0 ? "up" : "down",
      icon: (
        <svg
          className="h-6 w-6 text-danger-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6H6m6 0h6"
          />
        </svg>
      ),
    },
    {
      title: "Transactions",
      value: String(transactions.length),
      icon: (
        <svg
          className="h-6 w-6 text-primary-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          change={card.change}
          trend={card.trend}
          icon={card.icon}
        />
      ))}
    </div>
  );
}

export default StatCards;
