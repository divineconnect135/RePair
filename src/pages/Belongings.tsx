import { useEffect, useState } from "react";
import { Link } from "react-router";

import { getBelongings } from "../api/api";
import BelongingCard from "../components/BelongingCard";

import type { Belonging } from "../types/types";

const BelongingsPage = () => {
  const [belongings, setBelongings] = useState<Belonging[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchBelongings = async () => {
      try {
        const data = await getBelongings();
        const sortedData = [...data].sort(
          (a, b) => Number(b.id) - Number(a.id),
        );

        if (active) {
          setBelongings(sortedData);
        }
      } catch {
        if (active) {
          setError("Failed to load belongings");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchBelongings();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <p>Loading belongings...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Your Belongings
            </h1>

            <p className="mt-2 text-slate-500">
              Keep track of your belongings, warranties, and maintenance.
            </p>
          </div>

          <Link
            to="/belongings/new"
            className="rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
          >
            + Add Belonging
          </Link>
        </div>

        {belongings.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              No belongings yet
            </h2>

            <p className="mt-2 text-slate-500">
              Add your first belonging to start tracking it.
            </p>

            <Link
              to="/belongings/new"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
            >
              Add Belonging
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {belongings.map((belonging) => (
              <BelongingCard key={belonging.id} belonging={belonging} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default BelongingsPage;
