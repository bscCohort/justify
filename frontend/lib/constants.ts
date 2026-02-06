// Base URL for the backend API (override in `.env` with NEXT_PUBLIC_API_BASE).
export const API_BASE =  process.env.NEXT_PUBLIC_API_BASE ?? "/api";

// Map ML labels to user-friendly display names.
export const LEGAL_LABEL: Record<string, string> = {
  business: "Contract / Commercial",
  politics: "Constitution / Government",
  tech: "Cyber / IT",
  sport: "Sports Law",
  entertainment: "Media / IP",
};
