import { AppShell } from "@/components/app-shell";
import { requireAuth, signOut } from "@/auth/auth-service";

export default async function ProtectedSectionLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ section: string }>;
}>) {
  const { section } = await params;
  const user = await requireAuth(`/${section}`);

  return (
    <AppShell
      user={{ name: user.name, email: user.email, role: user.role }}
      logoutHref={signOut("/signin?signed_out=1")}
    >
      {children}
    </AppShell>
  );
}
