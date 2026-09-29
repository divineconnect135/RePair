import type { Belonging, CreateBelongingInput } from "../types/types";

const BASE_URL = import.meta.env.VITE_API_URL;

//GET
export const getBelongings = async (): Promise<Belonging[]> => {
  const res = await fetch(`${BASE_URL}/belongings`);
  if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);
  const data = await res.json();
  return data;
};

//GET - Read
export const getBelongingsById = async (id: string): Promise<Belonging> => {
  const res = await fetch(`${BASE_URL}/belongings/${id}`);
  if (!res.ok) throw new Error(`Unable to fetch belongings: ${res.status}`);
  const data = await res.json();
  return data;
};

//POST - Create
export const createBelongings = async (
  input: CreateBelongingInput,
): Promise<Belonging> => {
  const res = await fetch(`${BASE_URL}/belongings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error(`Failed to create belongings: ${res.status}`);
  }

  return res.json();
};

//PUT - Update
export const updateBelongings = async (
  id: string,
  input: CreateBelongingInput,
): Promise<Belonging> => {
  const res = await fetch(`${BASE_URL}/belongings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) throw new Error(`Failed to update belongings: ${res.status}`);

  return res.json();
};

//DELETE - Delete
export const deleteBelonging = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/belongings/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete belonging: ${res.status}`);
  }
};
