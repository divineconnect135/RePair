import { useState } from "react";
import { createMaintenanceRecord } from "../api/api";
import type { CreateMaintenanceInput } from "../types/types";
import { useParams, Link, useNavigate } from "react-router";
import type { FormEvent } from "react";

type MaintenanceForm = Omit<CreateMaintenanceInput, "belongingId">;

const initialValues: MaintenanceForm = {
  title: "",
  description: "",
  date: "",
  cost: 0,
  currency: "CAD",
};

const CreateMaintenancePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<MaintenanceForm>(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) {
      setError("Invalid belonging ID");
      return;
    }

    const newMaintenanceRecord: CreateMaintenanceInput = {
      belongingId: id,
      ...form,
    };

    setLoading(true);
    setError(null);

    try {
      await createMaintenanceRecord(newMaintenanceRecord);
      navigate(`/belongings/${id}`);
    } catch {
      setError("Failed to create");
    } finally {
      setLoading(false);
    }
  };

  if (!id) {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <p className="text-red-600">Invalid belonging ID</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-3xl">
        <Link
          to={`/belongings/${id}`}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Belonging
        </Link>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm md:p-10">
          <h1 className="text-3xl font-bold text-slate-900">
            Add Maintenance Record
          </h1>

          <p className="mt-2 text-slate-500">
            Add a repair or maintenance record for this belonging.
          </p>

          {error && (
            <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Title
              </label>

              <input
                id="title"
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                required
                placeholder="Battery Replacement"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Description
              </label>

              <textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                rows={4}
                placeholder="Describe the repair or maintenance..."
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Maintenance Date
              </label>

              <input
                id="date"
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    date: e.target.value,
                  })
                }
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="cost"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Cost
                </label>

                <input
                  id="cost"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.cost}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      cost: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="currency"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Currency
                </label>

                <select
                  id="currency"
                  value={form.currency}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      currency: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="CAD">CAD</option>
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Saving..." : "Add Maintenance Record"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateMaintenancePage;
