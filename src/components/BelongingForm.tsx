import { useState, type FormEvent } from "react";
import type { BelongingCondition, CreateBelongingInput } from "../types/types";

type BelongingFromProps = {
  initialValues: CreateBelongingInput;
  onSubmit: (values: CreateBelongingInput) => Promise<void>;
  submitLabel: string;
  loading: boolean;
};

const BelongingFrom = ({
  initialValues,
  onSubmit,
  submitLabel,
  loading,
}: BelongingFromProps) => {
  const [form, setForm] = useState<CreateBelongingInput>(initialValues);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Item Name
          </label>

          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            placeholder="MacBook Air M3"
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="brand"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Brand
          </label>

          <input
            id="brand"
            type="text"
            required
            value={form.brand}
            onChange={(e) =>
              setForm({
                ...form,
                brand: e.target.value,
              })
            }
            placeholder="Apple"
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Category
        </label>

        <input
          id="category"
          type="text"
          required
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
          placeholder="Electronics"
          className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="purchaseDate"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Purchase Date
          </label>

          <input
            id="purchaseDate"
            type="date"
            required
            value={form.purchaseDate}
            onChange={(e) =>
              setForm({
                ...form,
                purchaseDate: e.target.value,
              })
            }
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="warrantyExpiry"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Warranty Expiry
          </label>

          <input
            id="warrantyExpiry"
            type="date"
            required
            min={form.purchaseDate || undefined}
            value={form.warrantyExpiry}
            onChange={(e) =>
              setForm({
                ...form,
                warrantyExpiry: e.target.value,
              })
            }
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="purchasePrice"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Purchase Price
          </label>

          <input
            id="purchasePrice"
            type="number"
            min="0"
            step="0.01"
            required
            value={form.purchasePrice}
            onChange={(e) =>
              setForm({
                ...form,
                purchasePrice: Number(e.target.value),
              })
            }
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-blue-500"
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
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-blue-500"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="condition"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Condition
        </label>

        <select
          id="condition"
          value={form.condition}
          onChange={(e) =>
            setForm({
              ...form,
              condition: e.target.value as BelongingCondition,
            })
          }
          className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-blue-500"
        >
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
          <option value="poor">Poor</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Image URL
        </label>

        <input
          id="imageUrl"
          type="url"
          required
          value={form.imageUrl}
          onChange={(e) =>
            setForm({
              ...form,
              imageUrl: e.target.value,
            })
          }
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="notes"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Notes
        </label>

        <textarea
          id="notes"
          rows={4}
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes: e.target.value,
            })
          }
          placeholder="Additional information about this item..."
          className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};

export default BelongingFrom;
