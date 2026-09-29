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
