"use client";

import { Link } from "@prisma/client";
import { useState } from "react";
import AddItemForm from "@/components/form/add-item-form";
import SignOutButton from "@/components/form/sign-out-button";
import RemoveButton from "@/components/remove-button";

export default function Admin({ links }: { links: Link[] }) {
  const [content, setContent] = useState<{
    links: Link[] | null;
    error: string;
    success: string;
  }>({
    links: null,
    error: "",
    success: "",
  });
  const [pending, setPending] = useState<boolean>(false);

  return (
    <>
      <SignOutButton />
      <AddItemForm setPending={setPending} setContent={setContent} />

      <div>
        {content.error}
        {pending && <h2>PENDING</h2>}
        {(content.links !== null ? content.links : links)?.map((link) => (
          <article key={link.id}>
            <h2>{link.name}</h2>
            <RemoveButton
              id={link.id}
              setPending={setPending}
              setContent={setContent}
            />
          </article>
        ))}
      </div>
    </>
  );
}
