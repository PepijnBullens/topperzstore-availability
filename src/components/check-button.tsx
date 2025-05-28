"use client";

export default function CheckButton({
  setPending,
  link,
  size,
  setContent,
}: {
  setPending: (state: boolean) => void;
  link: string;
  size: string;
  setContent: (content: { available: boolean; error: string }) => void;
}) {
  const check = async () => {
    setPending(true);

    const response = await fetch(
      `/api/check-availability?size=${size}&url=${link}`
    );
    const result = await response.json();

    setContent({ available: result.available, error: result.error || "" });

    setPending(false);
  };

  return <button onClick={check}>check</button>;
}
