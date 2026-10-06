import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, signIn } from "@/auth/auth-service";
import { ProductIcon, ProductIconLibrary } from "@/components/product-icon";
import { SignInButton } from "@/components/sign-in-button";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function loginMessage(code: string | undefined): string | null {
  if (!code) return null;
  if (code === "access_denied") return "A autenticação foi cancelada. Você pode tentar novamente.";
  if (code === "login_required" || code === "session_invalid") {
    return "Sua sessão terminou. Entre novamente para continuar.";
  }
  if (code === "temporarily_unavailable") {
    return "O serviço de autenticação está indisponível no momento. Tente mais tarde.";
  }
  return "Não foi possível concluir o acesso. Tente novamente.";
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  const params = await searchParams;
  const errorMessage = loginMessage(firstValue(params.error));
  const signedOut = firstValue(params.signed_out) === "1";

  return (
    <main className="signin-screen">
      <ProductIconLibrary />
      <section className="signin-panel" aria-labelledby="signin-title">
        <Link className="signin-brand" href="/" aria-label="Task Agent">
          <span className="brand-mark"><ProductIcon name="mark" /></span>
          <span className="brand-copy">
            <strong>Task Agent</strong>
            <span>Gestão inteligente de tarefas</span>
          </span>
        </Link>

        <div className="signin-copy">
          <p className="eyebrow">Seu espaço de trabalho</p>
          <h1 id="signin-title">Organize seu trabalho com clareza.</h1>
          <p>Entre para acessar seu espaço. A organização de tarefas por linguagem natural será liberada por etapas.</p>
        </div>

        {signedOut && <p className="notice notice-success" role="status">Você saiu da sua conta.</p>}
        {errorMessage && <p className="notice notice-error" role="alert">{errorMessage}</p>}

        <SignInButton href={signIn("/dashboard")} />
        <p className="signin-assurance">Você entrará com sua conta ChatGPT. O Task Agent não solicita sua senha.</p>
      </section>
      <footer className="signin-footer">A autenticação da conta é gerenciada pelo ChatGPT.</footer>
    </main>
  );
}
