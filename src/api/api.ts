import type {
  Belonging,
  CreateBelongingInput,
  CreateMaintenanceInput,
  MaintenanceRecord,
} from "../types/types";

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

//For maintenanceRecords
// GET - Read
export const getMaintenanceRecordById = async (
  belongingId: string,
): Promise<MaintenanceRecord[]> => {
  const res = await fetch(
    `${BASE_URL}/maintenance-records?belongingId=${belongingId}`,
  );

  if (!res.ok) throw new Error("Failed to fetch Maintain record");

  return res.json();
};

//POST - Create
export const createMaintenanceRecord = async (
  input: CreateMaintenanceInput,
): Promise<MaintenanceRecord> => {
  const res = await fetch(`${BASE_URL}/maintenance-records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) throw new Error("Failed to Create");

  return res.json();
};

//DELETE - DELETE
export const deleteMaintenanceRecord = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/maintenance-records/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete Record: ${res.status}`);
  }
};
