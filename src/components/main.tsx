"use client";

export default function Main() {
  const check = async () => {
    const size = 8;
    const response = await fetch(`/api/check-availability?size=${size}`);
    const result = await response.text();
    console.log(result);
  };

  return (
    <main>
      <button onClick={check}>check</button>
    </main>
  );
}
