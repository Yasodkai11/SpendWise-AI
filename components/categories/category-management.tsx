import { prisma } from "@/lib/prisma";
import type { Category } from "@prisma/client";
import Card from "@/components/ui/card";
import {
  addCategory,
  updateCategory,
  deleteCategory,
} from "@/actions/categories";

export default async function CategoryManagement({
  userId,
}: {
  userId: string;
}) {
  const categories: Category[] = await prisma.category.findMany({
    where: { userId },
    orderBy: { name: "asc" },
  });

  return (
    <Card>
      <div className="mb-4">
        <p className="text-sm text-text-secondary">Manage</p>
        <h3 className="text-xl font-semibold text-text-primary">Categories</h3>
      </div>

      <form action={addCategory} className="mb-4 flex gap-2">
        <input
          name="name"
          placeholder="New category"
          className="w-full rounded-xl border border-border-light bg-white px-3 py-2 text-text-primary shadow-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
        />
        <button className="rounded-xl bg-linear-to-r from-primary-600 to-primary-700 px-4 py-2 text-white shadow-lg shadow-primary-200/60">
          Add
        </button>
      </form>

      <div className="space-y-3">
        {categories.map((c) => (
          <div key={c.id} className="flex items-center gap-3">
            <form action={updateCategory} className="flex flex-1 gap-2">
              <input type="hidden" name="id" value={c.id} />
              <input
                name="name"
                defaultValue={c.name}
                className="w-full rounded-xl border border-border-light bg-white px-3 py-2 text-text-primary shadow-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
              />
              <button className="rounded-xl bg-success-600 px-3 py-1 text-white shadow-sm">
                Save
              </button>
            </form>

            <form action={deleteCategory}>
              <input type="hidden" name="id" value={c.id} />
              <button className="rounded-xl bg-danger-600 px-3 py-1 text-white shadow-sm">
                Delete
              </button>
            </form>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="text-sm text-text-secondary">No categories yet.</p>
        )}
      </div>
    </Card>
  );
}
