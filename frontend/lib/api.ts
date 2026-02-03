import { API_BASE } from "@/lib/constants";
import { Case, CaseStatus, PredictionResult } from "@/types/case";

async function readJson(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, options);
  const data = await readJson(res);

  if (!res.ok) {
    const message =
      typeof data?.error === "string" && data.error
        ? data.error
        : "Request failed";
    throw new Error(message);
  }

  return data as T;
}

export function predictCategory(text: string): Promise<PredictionResult> {
  return request<PredictionResult>("/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
}

export function createCase(payload: {
  title: string;
  case_text: string;
}): Promise<{ id: number }> {
  return request<{ id: number }>("/cases", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function getCases(): Promise<Case[]> {
  return request<Case[]>("/cases");
}

export function getCase(id: string): Promise<Case> {
  return request<Case>(`/cases/${id}`);
}

export function updateCase(
  id: string,
  payload: { status: CaseStatus; notes: string }
): Promise<Case> {
  return request<Case>(`/cases/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function deleteCase(id: string): Promise<void> {
  await request<void>(`/cases/${id}`, { method: "DELETE" });
}
