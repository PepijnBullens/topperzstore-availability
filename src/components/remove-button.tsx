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
    console.log(result);

    setContent({ links: result.links, error: result.error || "", success: "" });

    setPending(false);
  };

  return <button onClick={remove}>remove</button>;
}
