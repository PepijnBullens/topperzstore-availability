"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInForm = () => {
  const router = useRouter();

  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    const signInData = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (!signInData?.ok) {
      console.error("Error while trying to sign in");
    } else {
      router.push("/admin");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="email"
        name="email"
        placeholder="admin@admin.com"
        value={form.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setForm((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        }
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={form.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setForm((prev) => ({
            ...prev,
            password: e.target.value,
          }))
        }
      />
      <button type="submit">Sign in</button>
    </form>
  );
};

export default SignInForm;
