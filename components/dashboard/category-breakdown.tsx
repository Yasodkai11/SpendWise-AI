import { prisma } from "@/lib/prisma";
import Card from "@/components/ui/card";

const formatCurrency = (value: number) =>
  `Rs. ${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export default async function CategoryBreakdown({
  userId,
}: {
  userId: string;
}) {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  const categories = await prisma.transaction.groupBy({
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
    orderBy: {
      _sum: {
        amount: "desc",
      },
    },
  });

  const max = Math.max(
    ...categories.map((item) => Number(item._sum.amount ?? 0)),
    1,
  );

  return (
    <Card className="h-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-text-secondary">Spending</p>
          <h3 className="text-xl font-semibold text-text-primary">
            Categories
          </h3>
        </div>
      </div>

      <div className="space-y-4">
        {categories.length === 0 ? (
          <p className="text-sm text-text-secondary">
            No expense data for this month yet.
          </p>
        ) : (
          categories.map((item) => {
            const total = Number(item._sum.amount ?? 0);
            const width = (total / max) * 100;

            return (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-text-primary">
                    {item.category}
                  </span>
                  <span className="text-text-secondary">
                    {formatCurrency(total)}
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-neutral-200">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-primary-500 to-emerald-500"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}
