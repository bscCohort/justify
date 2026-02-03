export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5000";

export const LEGAL_LABEL: Record<string, string> = {
  business: "Contract / Commercial",
  politics: "Constitution / Government",
  tech: "Cyber / IT",
  sport: "Sports Law",
  entertainment: "Media / IP",
};
