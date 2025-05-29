"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      className="button md:w-auto w-1/2"
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}`,
        })
      }
    >
      Sign Out
    </button>
  );
}
