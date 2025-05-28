"use client";

import { useState } from "react";

export default function AddItemForm() {
  const [form, setForm] = useState<{ link: string }>({ link: "" });
  const [status, setStatus] = useState<{
    pending: boolean;
    error: string;
    success: string;
  }>({
    pending: false,
    error: "",
    success: "",
  });

  const onSubmit = async () => {
    if (form.link === "") return;

    setStatus((prev) => ({ ...prev, pending: true }));

    const response = await fetch(`/api/add-item?link=${form.link}`);
    const result = await response.json();

    if (result) {
      setStatus((prev) => ({ ...prev, pending: false }));
    }

    setStatus((prev) => ({
      ...prev,
      error: result.error,
      success: result.success,
    }));
  };

  return (
    <>
      <p className="text-red-600">{status.error}</p>
      <p className="text-green-600">{status.success}</p>
      {status.pending && <p>PENDING</p>}
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
    </>
  );
}
