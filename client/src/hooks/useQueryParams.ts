import { useNavigate } from "@tanstack/react-router";

export default function useQueryParams() {
  const navigate = useNavigate({ from: "/" });
  return (key: string, value: string | number) => {
    navigate({ search: (prev) => ({ ...prev, [key]: value }) });
  };
}
