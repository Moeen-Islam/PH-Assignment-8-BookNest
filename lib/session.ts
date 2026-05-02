import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getCurrentSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}
