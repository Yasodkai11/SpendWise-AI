import { TransactionList } from "@/components/transactions/transaction-list";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function TransactionsPage({
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.10),_transparent_30%),linear-gradient(180deg,_#f8fbff_0%,_#eef4fb_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-600">
            Transactions
          </p>
          <h1 className="mt-2 text-3xl font-bold text-text-primary">
            All activity
          </h1>
          <p className="mt-2 text-text-secondary">
            Search, filter, and manage every income or expense entry.
          </p>
        </div>

        <TransactionList
          userId={session.user.id}
          searchParams={resolvedSearchParams}
        />
      </div>
    </div>
  );
}
