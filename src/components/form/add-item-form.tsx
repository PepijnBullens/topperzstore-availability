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
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="link">Add link to topperzstore.nl item</label>
      <input
        type="text"
        name="link"
        id="link"
        value={form.link}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setForm((prev) => ({
            ...prev,
            link: e.target.value,
          }))
        }
      />
      <button type="submit">submit</button>
    </form>
  );
}
