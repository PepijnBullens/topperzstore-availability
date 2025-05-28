import AddItemForm from "@/components/form/add-item-form";
import SignOutButton from "@/components/form/sign-out-button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Admin() {
  const session = await getServerSession(authOptions);
  return session?.user ? (
    <>
      <p>Welcome to admin, {session?.user.username}</p>
      <SignOutButton />
      <AddItemForm />
    </>
  ) : (
    <h2>Please sign in to view this page</h2>
  );
}
