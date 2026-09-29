export type WarrantyStatus = "active" | "expiring-soon" | "expired";

export const getWarrantyStatus = (warrantyExpiry: string): WarrantyStatus => {
  const today = new Date();
  const expiryDate = new Date(`${warrantyExpiry}T23:59:59`);

  const differenceInMs = expiryDate.getTime() - today.getTime();

  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

  if (differenceInDays < 0) {
    return "expired";
  }

  if (differenceInDays <= 30) {
    return "expiring-soon";
  }

  return "active";
};
