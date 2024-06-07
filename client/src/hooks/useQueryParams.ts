import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

export default function useQueryParams() {
  const navigate = useNavigate({ from: "/" });
  return useCallback(
    (key: string, value: string | number) => {
      navigate({ search: (prev) => ({ ...prev, [key]: value }) });
    },
    [navigate]
  );
}
