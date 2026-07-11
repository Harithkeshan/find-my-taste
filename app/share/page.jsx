import { redirect } from "next/navigation";

export default function ShareFallbackPage() {
  // If someone navigates to /share without a shareId, redirect them to the home page
  redirect("/");
}
