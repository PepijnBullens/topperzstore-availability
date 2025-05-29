"use client";

import { useState } from "react";
import { Link } from "@prisma/client";

export default function AddItemForm({
  setPending,
  setContent,
}: {
  setPending: (state: boolean) => void;
  setContent: (content: {
    links: Link[] | null;
    error: string;
    success: string;
  }) => void;
}) {
  const [form, setForm] = useState<{ link: string }>({ link: "" });

  const onSubmit = async () => {
    if (form.link === "") return;

    setPending(true);

    const response = await fetch(`/api/add-item?link=${form.link}`);
    const result = await response.json();

    setContent({
      links: result.links,
      error: result.error || "",
      success: result.success || "",
    });

    setPending(false);
  };

  return (
    <form
      className="flex gap-2 md:w-auto w-full"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        className="bg-black text-white rounded-md px-4 py-2 placeholder:text-white md:w-auto w-full"
        type="text"
        name="link"
        id="link"
        placeholder="New link to product..."
        value={form.link}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setForm((prev) => ({
            ...prev,
            link: e.target.value,
          }))
        }
      />
      <button
        className="bg-black text-white rounded-md px-4 py-2 uppercase font-bold cursor-pointer hover:opacity-80 transition"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
}
