"use client";

import CheckButton from "@/components/check-button";
import type { Link } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Main({ links }: { links: Link[] }) {
  const [content, setContent] = useState<{ available: boolean; error: string }>(
    { available: false, error: "" }
  );
  const [size, setSize] = useState<string>("");

  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <main>
      <h1>{pending ? "PENDING" : ""}</h1>
      <h2
        style={{
          color: content.available ? "green" : "red",
        }}
      >
        AVAILABLE
      </h2>
      <h2 className="text-red-600">{content.error}</h2>

      <input
        type="text"
        name="size"
        id="size"
        placeholder="Type a size"
        value={size}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSize(e.target.value)
        }
      />

      {links.map((link, index) => (
        <article key={index}>
          <img src={link.image} alt={`Image of ${link.name}`} />
          <a href={link.url} target="_blank">
            Check product
          </a>
          <p>{link.name}</p>
          <p>{link.price}</p>
          <CheckButton
            setPending={setPending}
            link={link.url}
            size={size}
            setContent={setContent}
          />
        </article>
      ))}
    </main>
  );
}
