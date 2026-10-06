import {
  CalendarDays,
  Check,
  LayoutDashboard,
  ListChecks,
  MessageSquareText,
  Settings2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavigationItem = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

const navigation: NavigationItem[] = [
  { label: "Visão geral", icon: LayoutDashboard, active: true },
  { label: "Tarefas", icon: ListChecks },
  { label: "Agente", icon: MessageSquareText },
  { label: "Calendário", icon: CalendarDays },
  { label: "Configurações", icon: Settings2 },
];

export default function Home() {
  return (
    <div className="site-shell">
      <aside className="sidebar" aria-label="Navegação do Task Agent">
        <a className="brand" href="#overview" aria-label="Task Agent, visão geral">
          <span className="brand-mark" aria-hidden="true">
            <Check size={19} strokeWidth={2.8} />
          </span>
          <span className="brand-copy">
            <strong>Task Agent</strong>
            <span>Gestão inteligente</span>
          </span>
        </a>

        <p className="nav-section-label">ESPAÇO DE TRABALHO</p>
        <nav className="primary-navigation" aria-label="Navegação principal">
          {navigation.map(({ label, icon: Icon, active }) =>
            active ? (
              <a
                key={label}
                className="nav-item nav-item-active"
                href="#overview"
                aria-current="page"
              >
                <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                <span>{label}</span>
              </a>
            ) : (
              <div key={label} className="nav-item nav-item-disabled" aria-disabled="true">
                <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                <span>{label}</span>
                <span className="nav-status">Em breve</span>
              </div>
            ),
          )}
        </nav>

        <div className="sidebar-note">
          <span className="sidebar-note-icon" aria-hidden="true">
            <ShieldCheck size={17} strokeWidth={1.8} />
          </span>
          <div>
            <strong>Segurança desde a base</strong>
            <p>Dados e ações terão limites claros.</p>
          </div>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-divider" aria-hidden="true">/</span>
            <strong>Visão geral</strong>
          </div>
          <div className="topbar-meta">
            <span className="phase-badge">FASE 0</span>
            <span className="profile-mark" aria-label="Prévia do produto, sem autenticação">
              TA
            </span>
          </div>
        </header>

        <main className="page-content" id="overview">
          <section className="page-intro" aria-labelledby="page-title">
            <p className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              Fundação do produto
            </p>
            <h1 id="page-title">Um espaço de tarefas pensado para conversar.</h1>
            <p className="intro-copy">
              Estamos definindo uma base modular para que o agente, as tarefas e as
              integrações evoluam por etapas, com responsabilidades bem separadas.
            </p>
          </section>

          <section className="foundation-card" aria-labelledby="foundation-title">
            <div className="card-heading">
              <span className="card-icon" aria-hidden="true">
                <Sparkles size={20} strokeWidth={1.8} />
              </span>
              <div>
                <p className="card-kicker">PRINCÍPIO ARQUITETURAL</p>
                <span className="card-phase">Base inicial</span>
              </div>
            </div>

            <h2 id="foundation-title">A IA propõe. A aplicação valida e executa.</h2>
            <p className="foundation-copy">
              Nenhuma sugestão do modelo irá direto ao banco ou a um serviço externo.
              Cada ação passará por validação e autorização da aplicação.
            </p>

            <div className="architecture-steps" aria-label="Limites planejados entre as camadas">
              <article className="architecture-step">
                <span className="step-number">01</span>
                <h3>Interpretar</h3>
                <p>O agente prepara uma proposta estruturada.</p>
              </article>
              <article className="architecture-step">
                <span className="step-number">02</span>
                <h3>Validar</h3>
                <p>Regras e permissões são verificadas pela aplicação.</p>
              </article>
              <article className="architecture-step">
                <span className="step-number">03</span>
                <h3>Executar</h3>
                <p>Serviços autorizados realizam a ação necessária.</p>
              </article>
            </div>
          </section>

          <footer className="page-footer">
            <span>Task Agent</span>
            <span>Arquitetura inicial · recursos funcionais serão adicionados nas próximas etapas</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
