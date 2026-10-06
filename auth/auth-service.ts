import "server-only";

import { env } from "cloudflare:workers";
import { redirect } from "next/navigation";
import {
  chatGPTSignInPath,
  chatGPTSignOutPath,
  getChatGPTUser,
} from "@/app/chatgpt-auth";
import { hasRole, roleForExternalUser } from "./authorization";
import type { AuthenticatedUser, UserRole } from "./types";

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  const identity = await getChatGPTUser();
  if (!identity) return null;

  return {
    externalUserId: identity.userId,
    name: identity.fullName,
    email: identity.email,
    role: roleForExternalUser(
      identity.userId,
      env.TASK_AGENT_ADMIN_EXTERNAL_USER_IDS,
    ),
  };
}

export async function requireAuth(returnTo: string): Promise<AuthenticatedUser> {
  const user = await getCurrentUser();
  if (user) return user;

  redirect(signIn(returnTo));
}

export async function requireRole(
  requiredRole: UserRole,
  returnTo: string,
): Promise<AuthenticatedUser> {
  const user = await requireAuth(returnTo);
  if (hasRole(user, requiredRole)) return user;

  redirect("/access-denied");
}

export function signIn(returnTo: string): string {
  return chatGPTSignInPath(returnTo);
}

export function signOut(returnTo: string): string {
  return chatGPTSignOutPath(returnTo);
}
