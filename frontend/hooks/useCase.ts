"use client";

import { useEffect, useState } from "react";
import { deleteCase, getCase, updateCase } from "@/lib/api";
import { Case, CaseStatus } from "@/types/case";
import { withBasePath } from "@/lib/routes";

export function useCase(id: string | undefined) {
  const [data, setData] = useState<Case | null>(null);
  const [status, setStatus] = useState<CaseStatus>("new");
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const body = await getCase(id);
      setData(body);
      setStatus(body.status || "new");
      setNotes(body.notes || "");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load case";
      setMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    if (!id) return;
    setMsg("");

    try {
      const body = await updateCase(id, { status, notes });
      setData(body);
      setMsg("Updated");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Update failed";
      setMsg(message);
    }
  };

  const remove = async () => {
    if (!id) return;
    setMsg("");

    try {
      await deleteCase(id);
      window.location.href = withBasePath("/cases");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Delete failed";
      setMsg(message);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  return {
    data,
    status,
    setStatus,
    notes,
    setNotes,
    msg,
    loading,
    save,
    remove,
    reload: load,
  };
}
