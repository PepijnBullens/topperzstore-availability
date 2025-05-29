"use client";

import { Link as PrismaLink } from "@prisma/client";
import { useState } from "react";
import AddItemForm from "@/components/form/add-item-form";
import SignOutButton from "@/components/form/sign-out-button";
import RemoveButton from "@/components/remove-button";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";

export default function Admin({ links }: { links: PrismaLink[] }) {
  const [content, setContent] = useState<{
    links: PrismaLink[] | null;
    error: string;
    success: string;
  }>({
    links: null,
    error: "",
    success: "",
  });
  const [pending, setPending] = useState<boolean>(false);
  const [showPending, setShowPending] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (pending) {
      timer = setTimeout(() => setShowPending(true), 3000);
    } else {
      setShowPending(false);
    }
    return () => clearTimeout(timer);
  }, [pending]);

  return (
    <main>
      <nav className="w-full flex justify-between mb-12">
        <div className="flex gap-2">
          <Link href="/" className="button">
            Back
          </Link>
          <SignOutButton />
        </div>
        <AddItemForm setPending={setPending} setContent={setContent} />
      </nav>

      <h2 className="font-black uppercase text-4xl mb-8">Links</h2>

      {content.error && (
        <section className="background-red p-8 text-white font-black text-xl rounded-md mb-8">
          <h6>{content.error}</h6>
        </section>
      )}

      {showPending && (
        <section className="bg-black p-8 text-white font-black text-xl rounded-md mb-8">
          <h6>LOADING</h6>
        </section>
      )}

      <table>
        <thead className="border-b-1 border-[#777777]">
          <tr>
            <th className="px-8">Preview</th>
            <th className="px-8">Name</th>
            <th className="px-8">Price</th>
            <th className="px-8">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(content.links !== null ? content.links : links)?.map((link) => (
            <tr key={link.id} className="border-b-1 border-[#777777]">
              <td className="px-8 w-0">
                <Image
                  width={100}
                  height={60}
                  src={link.image}
                  alt={`Image of product: ${link.name}`}
                />
              </td>
              <td className="px-8 text-nowrap max-w-[100px] overflow-ellipsis overflow-hidden">
                {link.name}
              </td>
              <td className="px-8 text-nowrap max-w-[100px] overflow-ellipsis overflow-hidden">
                {link.price}
              </td>
              <td className="px-8 flex gap-2">
                <a target="_blank" href={link.url} className="button">
                  View Product
                </a>
                <RemoveButton
                  id={link.id}
                  setPending={setPending}
                  setContent={setContent}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
