import BudgetPanel from "@/components/dashboard/budget-panel";
import CategoryBreakdown from "@/components/dashboard/category-breakdown";
import ExpenseChart from "@/components/dashboard/expense-chart";
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import { StatCards } from "@/components/dashboard/stats-cards";
import TransactionForm from "@/components/transactions/transaction-form";
import { TransactionList } from "@/components/transactions/transaction-list";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const resolvedSearchParams = (await Promise.resolve(
    searchParams ?? {},
  )) as Record<string, string | string[] | undefined>;

  return (
    <div className="flex h-screen overflow-hidden bg-bg-secondary">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-8 sm:px-8">
            <div className="mx-auto max-w-7xl space-y-8">
              {/* Welcome Section */}
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">
                  Dashboard
                </p>
                <h1 className="text-3xl font-bold text-text-primary">
                  Welcome back, {session.user.name || "User"} 👋
                </h1>
                <p className="mt-2 text-text-secondary">
                  Here&apos;s your financial overview for this month.
                </p>
              </div>

              {/* Stats Cards */}
              <StatCards userId={session.user.id} />

              {/* Charts and Budget */}
              <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <ExpenseChart userId={session.user.id} />
                <CategoryBreakdown userId={session.user.id} />
              </div>

              {/* Budget and Quick Entry */}
              <div className="grid gap-6 xl:grid-cols-[1fr_1.3fr]">
                <BudgetPanel userId={session.user.id} />
                <TransactionForm userId={session.user.id} />
              </div>

              {/* Recent Transactions */}
              <TransactionList
                userId={session.user.id}
                searchParams={resolvedSearchParams}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
