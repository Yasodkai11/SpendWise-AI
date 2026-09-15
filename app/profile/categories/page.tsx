import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CategoryManagement from "@/components/categories/category-management";

export default async function CategoriesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.10),_transparent_30%),linear-gradient(180deg,_#f8fbff_0%,_#eef4fb_100%)] p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-2xl font-bold text-text-primary">
          Categories
        </h1>
        <CategoryManagement userId={session.user.id} />
      </div>
    </div>
  );
}
