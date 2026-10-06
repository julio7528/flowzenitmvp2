export type UserRole = "user" | "admin";

export type AuthenticatedUser = {
  externalUserId: string;
  name: string | null;
  email: string | null;
  role: UserRole;
};

/** Future persistence shape only; this phase does not create or store profiles. */
export type FutureProfileRecord = {
  id: string;
  external_user_id: string;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
  role: UserRole;
  status: "active" | "suspended";
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
};
