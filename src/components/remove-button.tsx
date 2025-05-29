"use client";

import { Link } from "@prisma/client";

export default function RemoveButton({
  id,
  setPending,
  setContent,
}: {
  id: number;
  setPending: (state: boolean) => void;
  setContent: (content: {
    links: Link[] | null;
    error: string;
    success: string;
  }) => void;
}) {
  const remove = async () => {
    setPending(true);

    const response = await fetch(`/api/remove-item?id=${id}`);
    const result = await response.json();

    setContent({ links: result.links, error: result.error || "", success: "" });

    setPending(false);
  };

  return (
    <button className="button background-red" onClick={remove}>
      remove
    </button>
  );
}
