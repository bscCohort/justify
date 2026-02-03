"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCases } from "@/lib/api";
import { Case } from "@/types/case";

export function useCases() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getCases();
      setCases(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load cases";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { cases, loading, reload: load };
}
