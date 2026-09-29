import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import BelongingForm from "../components/BelongingForm";

import { getBelongingsById, updateBelongings } from "../api/api";

import type { Belonging, CreateBelongingInput } from "../types/types";

const EditBelongingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [belonging, setBelonging] = useState<Belonging | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      console.log("Unable");
      return;
    }

    let active = true;

    const fetchBelonging = async () => {
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

  const handleUpdate = async (values: CreateBelongingInput) => {
    if (!id) return;

    setSaving(true);
    setError(null);

    try {
      const updatedBelonging = await updateBelongings(id, values);

      navigate(`/belongings/${updatedBelonging.id}`);
    } catch {
      setError("Failed to update belonging");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading belonging...</p>;
  }

  if (error && !belonging) {
    return <p>{error}</p>;
  }

  if (!belonging) {
    return <p>Belonging not found</p>;
  }

  const initialValues: CreateBelongingInput = {
    name: belonging.name,
    brand: belonging.brand,
    category: belonging.category,
    purchaseDate: belonging.purchaseDate,
    purchasePrice: belonging.purchasePrice,
    currency: belonging.currency,
    warrantyExpiry: belonging.warrantyExpiry,
    condition: belonging.condition,
    imageUrl: belonging.imageUrl,
    notes: belonging.notes,
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-3xl">
        <Link
          to={`/belongings/${belonging.id}`}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Details
        </Link>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm md:p-10">
          <h1 className="text-3xl font-bold text-slate-900">Edit Belonging</h1>

          <p className="mt-2 text-slate-500">
            Update the information for this belonging.
          </p>

          {error && (
            <p
              role="alert"
              className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <div className="mt-8">
            <BelongingForm
              initialValues={initialValues}
              onSubmit={handleUpdate}
              submitLabel="Save Changes"
              loading={saving}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditBelongingPage;
