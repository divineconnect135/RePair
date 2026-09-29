import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { createBelongings } from "../api/api";

import type { CreateBelongingInput } from "../types/types";
import BelongingForm from "../components/BelongingForm";
const initialValues: CreateBelongingInput = {
  name: "",
  brand: "",
  category: "",
  purchaseDate: "",
  purchasePrice: 0,
  currency: "INR",
  warrantyExpiry: "",
  condition: "good",
  imageUrl: "",
  notes: "",
};

const CreateBelongingPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (values: CreateBelongingInput) => {
    setLoading(true);
    setError(null);

    try {
      const newBelonging = await createBelongings(values);

      navigate(`/belongings/${newBelonging.id}`);
    } catch {
      setError("Failed to create belonging. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-3xl">
        <Link
          to="/belongings"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Belongings
        </Link>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm md:p-10">
          <h1 className="text-3xl font-bold text-slate-900">
            Add New Belonging
          </h1>

          <p className="mt-2 text-slate-500">
            Add an item to your personal digital passport.
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
              onSubmit={handleCreate}
              submitLabel="Create Belonging"
              loading={loading}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreateBelongingPage;
