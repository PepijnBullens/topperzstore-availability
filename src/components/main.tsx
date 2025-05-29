"use client";

import type { Link } from "@prisma/client";
import { useState, useEffect } from "react";
import TableRecord from "./table-record";

export default function Main({ links }: { links: Link[] }) {
  const [error, setError] = useState<string>("");

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
      <h2 className="font-black uppercase text-4xl mb-8">Links</h2>

      {error !== "" && (
        <section className="background-red p-8 text-white font-black text-xl rounded-md mb-8">
          <h6>{error}</h6>
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
            <th className="px-8">Availability</th>
            <th className="px-8">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <TableRecord key={link.name} link={link} setError={setError} />
          ))}
        </tbody>
      </table>

      {/* <h2
        style={{
          color: content.available ? "green" : "red",
        }}
      >
        AVAILABLE
      </h2> */}
    </main>
  );
}
