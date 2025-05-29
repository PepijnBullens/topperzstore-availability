"use client";

import { Link } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

export default function TableRecord({
  link,
  setError,
}: {
  link: Link;
  setError: (state: string) => void;
}) {
  const [size, setSize] = useState<string>("");

  const [pending, setPending] = useState<boolean>(false);
  const [availability, setAvailability] = useState<boolean | null>(null);

  const check = async () => {
    setPending(true);

    const response = await fetch(
      `/api/check-availability?size=${size}&url=${link.url}`
    );
    const result = await response.json();

    setAvailability(result.available);

    setError(result.error || "");

    setPending(false);
  };

  return (
    <tr key={link.id} className="border-b-1 border-[#777777]">
      <td className="px-8 w-0">
        <Image
          width={100}
          height={60}
          src={link.image}
          alt={`Image of product: ${link.name}`}
        />
      </td>
      <td className="px-8 text-nowrap max-w-[200px] overflow-ellipsis overflow-hidden">
        {link.name}
      </td>
      <td className="px-8 text-nowrap max-w-[200px] overflow-ellipsis overflow-hidden">
        {link.price}
      </td>
      <td
        className="px-8 font-black"
        style={{
          color:
            availability === null
              ? ""
              : availability
              ? "var(--green)"
              : "var(--red)",
        }}
      >
        {pending
          ? "loading"
          : availability === null
          ? "not checked"
          : availability
          ? "available"
          : "not available"}
      </td>
      <td className="px-8 flex gap-12">
        <a target="_blank" href={link.url} className="button">
          View Product
        </a>
        <div className="flex gap-2">
          <input
            className="input-alt"
            type="text"
            name="size"
            id="size"
            placeholder="Type a size"
            value={size}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSize(e.target.value);
              setAvailability(null);
            }}
          />
          <button onClick={check} className="button">
            check
          </button>
        </div>
      </td>
    </tr>
  );
}
