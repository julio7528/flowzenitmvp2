import assert from "node:assert/strict";
import test from "node:test";
import { chatGPTIdentityFromHeaders } from "./chatgpt-identity.ts";
import { hasRole, roleForExternalUser } from "./authorization.ts";

test("provider identity requires its stable ID and accepts optional profile fields", () => {
  assert.deepEqual(
    chatGPTIdentityFromHeaders(new Headers({ "oai-authenticated-user-id": "account-1" })),
    { userId: "account-1", email: null, fullName: null },
  );
  assert.equal(
    chatGPTIdentityFromHeaders(new Headers({ "oai-authenticated-user-email": "person@example.test" })),
    null,
  );
});

test("provider full name is decoded only with the Sites UTF-8 marker", () => {
  const user = chatGPTIdentityFromHeaders(new Headers({
    "oai-authenticated-user-id": "account-1",
    "oai-authenticated-user-full-name": "M%C3%A1rcia%20Costa",
    "oai-authenticated-user-full-name-encoding": "percent-encoded-utf-8",
  }));

  assert.equal(user?.fullName, "Márcia Costa");
});

test("new identities receive the user role unless explicitly allowlisted", () => {
  assert.equal(roleForExternalUser("account-1", undefined), "user");
  assert.equal(roleForExternalUser("account-1", ""), "user");
});

test("admin assignment matches exact stable IDs from server configuration", () => {
  assert.equal(roleForExternalUser("account-1", "account-2, account-1"), "admin");
  assert.equal(roleForExternalUser("account-10", "account-1"), "user");
  assert.equal(roleForExternalUser("ACCOUNT-1", "account-1"), "user");
});

test("role checks distinguish authentication from admin permission", () => {
  const user = {
    externalUserId: "account-1",
    name: null,
    email: null,
    role: "user",
  };

  assert.equal(hasRole(user, "user"), true);
  assert.equal(hasRole(user, "admin"), false);
});
