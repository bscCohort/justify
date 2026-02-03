"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { predictCategory } from "@/lib/api";
import { PredictionResult } from "@/types/case";

export function usePredict() {
  const [pred, setPred] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number> | null>(null);

  const predict = async (text: string) => {
    if (!text.trim()) {
      toast.error("Please enter case text");
      return;
    }

    try {
      const data: PredictionResult = await predictCategory(text);
      setPred(data.category);
      setScores(data.scores || null);
      toast.success("Prediction ready");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Prediction failed";
      toast.error(message);
    }
  };

  const reset = () => {
    setPred(null);
    setScores(null);
  };

  return { pred, scores, predict, reset };
}
