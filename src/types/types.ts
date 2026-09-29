export type BelongingCondition = "poor" | "fair" | "good" | "excellent";

export type Belonging = {
  id: string;
  name: string;
  brand: string;
  category: string;
  purchaseDate: string;
  purchasePrice: number;
  currency: string;
  warrantyExpiry: string;
  condition: BelongingCondition;
  imageUrl: string;
  notes: string;
};

export type CreateBelongingInput = Omit<Belonging, "id">;

export type MaintenanceRecord = {
  id: string;
  belongingId: string;
  title: string;
  description: string;
  date: string;
  cost: number;
  currency: string;
};
export type CreateMaintenanceInput = Omit<MaintenanceRecord, "id">;
