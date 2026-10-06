import type { AuthenticatedUser, UserRole } from "./types";

export function hasRole(user: AuthenticatedUser, requiredRole: UserRole): boolean {
  return user.role === requiredRole;
}

export function roleForExternalUser(
  externalUserId: string,
  configuredAdminIds: string | undefined,
): UserRole {
  const adminIds = new Set(
    (configuredAdminIds ?? "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),
  );

  return adminIds.has(externalUserId) ? "admin" : "user";
}
