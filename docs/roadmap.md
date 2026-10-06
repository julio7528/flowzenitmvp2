# Roadmap do Task Agent

**Fase atual:** Fase 1 — GitHub e estrutura inicial, concluída. O projeto está versionado na branch `main` do repositório público [`julio7528/flowzenitmvp2`](https://github.com/julio7528/flowzenitmvp2). **A Fase 2 ainda não começou.**

As fases abaixo resumem o roadmap do projeto. As fases depois da Fase 1 permanecem planejadas; este documento não as implementa nem antecipa suas funcionalidades.

| Fase | Escopo | Estado |
| --- | --- | --- |
| 0 | Fundação e arquitetura | Concluída |
| 1 | GitHub, estrutura inicial, documentação e preparação segura para versionamento | Concluída; remote público conectado |
| 2 | Interface base e design do produto | Planejada; próxima fase |
| 3 | Autenticação Sign in with ChatGPT | Planejada |
| 4 | Supabase/PostgreSQL, modelo de dados e RLS | Planejada |
| 5 | Criação, leitura, edição e conclusão de tarefas | Planejada |
| 6 | Painel administrativo | Planejada |
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
| 17 | Dashboard | Planejada |
| 18 | Configurações pessoais | Planejada |
| 19 | Preferências, contexto e memória do agente | Planejada |
| 20 | Sistema de ações | Planejada |
| 21 | Reforço e revisão de segurança | Planejada |
| 22 | Observabilidade | Planejada |
| 23 | Testes | Planejada |
| 24 | Arquitetura multiagente | Planejada |

## Sequência de implementação

A IA poderá interpretar pedidos e propor operações. A aplicação continuará validando os dados, verificando identidade e autorização no servidor, solicitando confirmação quando necessário e executando somente ações permitidas. Providers de IA e integrações externas permanecerão isolados atrás de adaptadores, conforme [architecture.md](architecture.md).
