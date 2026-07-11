import { redirect } from "next/navigation";

export default function ResultFallbackPage() {
  // If someone navigates to /result without a shareId, redirect them to the home page
  // so they don't hit a raw 404 page.
  redirect("/");
}
