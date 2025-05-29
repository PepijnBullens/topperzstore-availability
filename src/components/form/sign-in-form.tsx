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
  const [error, setError] = useState<string>("");

  const onSubmit = async () => {
    const signInData = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (!signInData?.ok) {
      setError("Sign in failed");
    } else {
      router.push("/admin");
    }
  };

  return (
    <main className="w-[calc(100vw-4rem)] h-[calc(100vh-4rem)] flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex flex-col gap-4 bg-[#ededed] rounded-md p-4 min-w-[400px]"
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
          className="input"
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
          className="input"
        />
        <p className="color-red">{error}</p>
        <button type="submit" className="button">
          Sign in
        </button>
      </form>
    </main>
  );
};

export default SignInForm;
