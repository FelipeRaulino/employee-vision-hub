import { useEffect, useState, useCallback } from "react";
import { getErrorMessage } from "@/lib/axiosClient";
import type { Employee } from "../types";
import { getEmployees } from "../api";

export function useEmployeeData() {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    let cancelled = false;

    try {
      const res = await getEmployees();
      setData(res);
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      if (!cancelled) setError(message);
    } finally {
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, setData, loading, error, refetch: fetch };
}
