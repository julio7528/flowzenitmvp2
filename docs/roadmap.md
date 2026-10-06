# Roadmap do Task Agent

**Fase atual:** Fase 4 — Supabase/PostgreSQL, modelo de dados e RLS. As Fases 0 a 3 estão concluídas; ainda não há persistência de perfis ou tarefas neste projeto.

| Fase | Escopo | Estado |
| --- | --- | --- |
| 0 | Fundação e arquitetura | Concluída |
| 1 | GitHub, estrutura inicial, documentação e preparação segura para versionamento | Concluída; branch main do repositório público conectada |
| 2 | Interface base e design do produto | Concluída; páginas-base e padrões visuais reutilizáveis |
| 3 | Autenticação Sign in with ChatGPT | Concluída; login real, sessão e proteção server-side validados |
| 4 | Supabase/PostgreSQL, modelo de dados e RLS | Planejada |
| 5 | Criação, leitura, edição e conclusão de tarefas | Planejada |
| 6 | Painel administrativo funcional | Planejada |
| 7 | Configuração segura do provider DeepSeek | Planejada |
| 8 | Agente para interpretar solicitações e produzir saída estruturada | Planejada |
| 9 | Revisão e confirmação de ações propostas | Planejada |
| 10 | Auditoria e histórico de ações | Planejada |
| 11 | Projetos | Planejada |
| 12 | Tags | Planejada |
| 13 | Integração com Google Calendar | Planejada |
| 14 | Agente de planejamento | Planejada |
| 15 | Replanejamento | Planejada |
| 16 | Tarefas recorrentes | Planejada |
| 17 | Dashboard com dados reais | Planejada |
| 18 | Configurações pessoais funcionais | Planejada |
| 19 | Preferências, contexto e memória do agente | Planejada |
| 20 | Sistema de ações | Planejada |
| 21 | Reforço e revisão de segurança | Planejada |
| 22 | Observabilidade | Planejada |
| 23 | Testes | Planejada |
| 24 | Arquitetura multiagente | Planejada |

## Sequência de implementação

A IA poderá interpretar pedidos e propor operações. A aplicação continuará validando os dados, verificando identidade e autorização no servidor, solicitando confirmação quando necessário e executando somente ações permitidas. Providers de IA e integrações externas permanecerão isolados atrás de adaptadores, conforme [architecture.md](architecture.md).

Dashboard, Tarefas, Agente, Calendário, Configurações e Admin mantêm estados-base. A autenticação e a proteção server-side estão implementadas; banco, RLS, CRUD e integrações continuam pendentes nas fases correspondentes.
