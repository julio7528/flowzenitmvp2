import { notFound } from "next/navigation";
import { requireRole } from "@/auth/auth-service";
import { ProductIcon } from "@/components/product-icon";

const pages = {
  dashboard: {
    label: "Dashboard",
    eyebrow: "Seu espaço de trabalho",
    description: "Uma visão clara do seu trabalho, pronta para crescer com você.",
    badge: "Estrutura inicial",
    title: "Seu espaço de trabalho está pronto",
    empty: "Os resumos do seu trabalho aparecerão aqui quando as funcionalidades forem implementadas.",
  },
  tarefas: {
    label: "Tarefas",
    eyebrow: "Organização",
    description: "Acompanhe o que precisa ser feito em um espaço simples e organizado.",
    badge: "Em preparação",
    title: "Nenhuma tarefa para exibir",
    empty: "A criação e o gerenciamento de tarefas serão adicionados em uma próxima etapa.",
  },
  agente: {
    label: "Agente",
    eyebrow: "Linguagem natural",
    description: "Um espaço futuro para organizar tarefas a partir do que você descreve.",
    badge: "Em preparação",
    title: "O agente ainda não está conectado",
    empty: "A interpretação de solicitações em linguagem natural será implementada em uma fase futura.",
  },
  calendario: {
    label: "Calendário",
    eyebrow: "Agenda",
    description: "Uma visão futura dos compromissos ligados às suas tarefas.",
    badge: "Em preparação",
    title: "Calendário ainda não conectado",
    empty: "A integração com calendários externos não faz parte desta etapa.",
  },
  configuracoes: {
    label: "Configurações",
    eyebrow: "Preferências",
    description: "Preferências de conta e do espaço de trabalho, quando estiverem disponíveis.",
    badge: "Em preparação",
    title: "Configurações em preparação",
    empty: "As opções de conta serão adicionadas depois que a autenticação estiver disponível.",
  },
  admin: {
    label: "Admin",
    eyebrow: "Área reservada",
    description: "Espaço visual preparado para uma fase futura do produto.",
    badge: "Planejado",
    title: "Área administrativa indisponível",
    empty: "Nenhuma ferramenta de gerenciamento ou controle administrativo está implementada.",
  },
} as const;

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (section === "access-denied") {
    return (
      <section className="page-view" aria-labelledby="access-denied-title">
        <header className="page-heading">
          <p className="eyebrow">Permissões</p>
          <h1 id="access-denied-title">Acesso restrito</h1>
          <p className="page-description">Sua conta não tem permissão para abrir esta área.</p>
        </header>
        <section className="card empty-state" aria-labelledby="access-denied-message">
          <span className="empty-icon"><ProductIcon name="admin" /></span>
          <span className="badge badge-neutral">Sem acesso</span>
          <h2 id="access-denied-message">Área disponível apenas para administradores</h2>
          <p>Se você acredita que deveria ter acesso, fale com a pessoa responsável pelo Task Agent.</p>
        </section>
      </section>
    );
  }

  if (!Object.hasOwn(pages, section)) notFound();

  if (section === "admin") await requireRole("admin", "/admin");

  const page = pages[section as keyof typeof pages];
  return (
    <section className="page-view" aria-labelledby="page-title">
      <header className="page-heading">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1 id="page-title" tabIndex={-1}>{page.label}</h1>
        <p className="page-description">{page.description}</p>
      </header>
      <section className="card empty-state" aria-labelledby="empty-title">
        <span className="empty-icon"><ProductIcon name="empty" /></span>
        <span className="badge badge-neutral">{page.badge}</span>
        <h2 id="empty-title">{page.title}</h2>
        <p>{page.empty}</p>
      </section>
    </section>
  );
}
