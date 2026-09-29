import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import type { Belonging, MaintenanceRecord } from "../types/types";

import {
  deleteBelonging,
  deleteMaintenanceRecord,
  getBelongingsById,
  getMaintenanceRecordById,
} from "../api/api";

const BelongingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [belonging, setBelonging] = useState<Belonging | null>(null);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [maintenanceRecords, setMaintenanceRecords] = useState<
    MaintenanceRecord[]
  >([]);
  const [maintenanceLoading, setMaintenanceLoading] = useState(true);
  const [maintenanceError, setMaintenanceError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      console.log("Failed");
      return;
    }

    let active = true;

    const fetchBelonging = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getBelongingsById(id);

        if (active) {
          setBelonging(data);
        }
      } catch {
        if (active) {
          setError("Failed to fetch belonging");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchBelonging();

    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    if (!id) {
      console.log("failed");
      return;
    }

    let active = true;

    const fetchMaintenanceRecord = async () => {
      setMaintenanceLoading(true);
      setMaintenanceError(null);

      try {
        const data = await getMaintenanceRecordById(id);
        if (active) {
          setMaintenanceRecords(data);
        }
      } catch {
        if (active) {
          setMaintenanceError("Failed to Fetch");
        }
      } finally {
        if (active) {
          setMaintenanceLoading(false);
        }
      }
    };

    fetchMaintenanceRecord();

    return () => {
      active = false;
    };
  }, [id]);

  const handleDelete = async () => {
    if (!belonging) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this belonging?",
    );

    if (!confirmed) return;

    setDeleting(true);
    setError(null);

    try {
      await deleteBelonging(belonging.id);

      navigate("/belongings");
    } catch {
      setError("Failed to delete belonging");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <p>Loading belonging...</p>
      </main>
    );
  }

  if (error && !belonging) {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  if (!belonging) {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <p>Belonging not found.</p>
      </main>
    );
  }

  const handleRecordDelete = async (recordId: string) => {
    const confirm = window.confirm("Are you sure you want to delete a record?");

    if (!confirm) return;
    setMaintenanceError(null);

    try {
      await deleteMaintenanceRecord(recordId);

      setMaintenanceRecords((currentRecords) =>
        currentRecords.filter((record) => record.id !== recordId),
      );
    } catch {
      setMaintenanceError("Failed to DELETE");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Belongings
        </Link>

        {error && (
          <p
            role="alert"
            className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        <div className="grid overflow-hidden rounded-2xl bg-white shadow-sm md:grid-cols-2">
          <div className="flex items-center justify-center bg-slate-200 p-6">
            <img
              src={belonging.imageUrl}
              alt={belonging.name}
              className="h-80 w-full rounded-xl object-contain"
            />
          </div>

          <div className="space-y-6 p-6 md:p-10">
            <div>
              <p className="text-sm font-medium text-blue-600">
                {belonging.category}
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                {belonging.name}
              </h1>

              <p className="mt-2 text-slate-500">{belonging.brand}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Purchase Price</p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                {belonging.currency} {belonging.purchasePrice.toLocaleString()}
              </p>
            </div>

            <hr className="border-slate-200" />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Belonging Information
              </h2>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Purchase Date</span>

                <span className="font-medium text-slate-900">
                  {belonging.purchaseDate}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Warranty Expiry</span>

                <span className="font-medium text-slate-900">
                  {belonging.warrantyExpiry}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Condition</span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium capitalize text-green-700">
                  {belonging.condition}
                </span>
              </div>
            </div>

            <hr className="border-slate-200" />

            <div>
              <h2 className="text-lg font-semibold text-slate-900">Notes</h2>

              <p className="mt-2 leading-7 text-slate-600">
                {belonging.notes || "No notes added."}
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Link
                to={`/belongings/${belonging.id}/edit`}
                className="flex-1 rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Edit Belonging
              </Link>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Belonging"}
              </button>
            </div>
          </div>
        </div>

        {/* Maintenance History */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm md:p-10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Maintenance History
            </h2>

            <p className="mt-1 text-slate-500">
              Repairs and maintenance for this belonging.
            </p>
          </div>

          {maintenanceLoading && (
            <p className="text-slate-500">Loading maintenance records...</p>
          )}

          {maintenanceError && (
            <p className="text-red-600">{maintenanceError}</p>
          )}

          {!maintenanceLoading &&
            !maintenanceError &&
            maintenanceRecords.length === 0 && (
              <p className="text-slate-500">No maintenance records yet.</p>
            )}

          {!maintenanceLoading &&
            !maintenanceError &&
            maintenanceRecords.length > 0 && (
              <div className="space-y-6">
                {maintenanceRecords.map((record) => (
                  <article
                    key={record.id}
                    className="rounded-xl border border-slate-200 p-5 "
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {record.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {record.date}
                        </p>
                      </div>

                      <p className="font-semibold text-slate-900">
                        {record.currency} {record.cost.toLocaleString()}
                      </p>
                    </div>

                    <p className="mt-3 text-slate-600">{record.description}</p>
                    <button
                      onClick={() => handleRecordDelete(record.id)}
                      className="rounded-lg bg-slate-500 px-2 py-2 hover:bg-red-600  text-white mt-2 cursor-pointer"
                    >
                      Delete Record
                    </button>
                  </article>
                ))}
                <Link
                  to={`/belongings/${id}/add`}
                  className="rounded-xl bg-slate-500 px-2 py-4 hover:bg-amber-600  text-white"
                >
                  Add Maintenance History
                </Link>
              </div>
            )}
        </div>
      </section>
    </main>
  );
};

export default BelongingDetailPage;
