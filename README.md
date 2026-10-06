# Task Agent

Sistema de gerenciamento de tarefas que deverá permitir organização por linguagem natural. Um agente de IA poderá interpretar pedidos e propor dados; a aplicação continuará responsável por validar, autorizar e executar as operações.

## Estado do projeto

**Estado: Fase 3 concluída; Fase 4 é a próxima.** O acesso usa Sign in with ChatGPT nativo do ChatGPT Sites. Dashboard, Tarefas, Agente, Calendário, Configurações e Admin continuam como estados vazios; a autenticação é a única funcionalidade de produto implementada.

O Site permanece no projeto existente [task-agent.julio7528.chatgpt.site](https://task-agent.julio7528.chatgpt.site) e conserva a audiência configurada no Sites. Não há banco de dados de negócio, tarefas reais, agente de IA, calendário ou painel administrativo funcional.

## Stack

| Componente | Estado |
| --- | --- |
| ChatGPT Sites | Runtime Vinext/Cloudflare Worker; gerencia o fluxo nativo de autenticação. |
| Sign in with ChatGPT | Implementado por meio dos caminhos oficiais do Sites. |
| Identidade e autorização | Serviço interno server-side; roles `user` e `admin`. |
| GitHub | Repositório existente `julio7528/flowzenitmvp2`; a visibilidade atual é pública e não foi alterada nesta fase. |
| Supabase / PostgreSQL | Planejados; sem persistência de perfis ou tarefas. |
| DeepSeek API | Planejada; sem chamadas ou credenciais configuradas. |
| Google Calendar | Planejado; sem integração. |

## Autenticação e permissões

- `/signin` mostra somente a opção **Entrar com ChatGPT**.
- A raiz e as páginas do workspace exigem identidade enviada pelo runtime do Sites.
- Sessões são gerenciadas pelo mecanismo do Sites; o app não armazena tokens nem cookies manualmente.
- Nome e e-mail são usados apenas quando fornecidos. O adaptador desta stack não expõe uma foto de perfil.
- O ID externo fica no servidor para resolver a role e não é enviado aos componentes do navegador.
- Todo usuário recebe `user`. Uma role `admin` exige correspondência exata com um identificador listado na configuração de runtime `TASK_AGENT_ADMIN_EXTERNAL_USER_IDS` do Site. A variável fica no Worker, não no frontend, e é opcional; sem ela, todos são `user`.
- O link Admin só aparece para `admin`; a rota também exige essa role no servidor.

Não existe perfil persistido. `auth/types.ts` registra somente a forma futura do profile; Supabase e PostgreSQL aguardam a Fase 4.

## Desenvolvimento local

O projeto requer Node.js `>=22.13.0`.

```sh
npm install
npm run dev
```

O preview local usa a simulação de login fornecida pelo plugin de desenvolvimento do Sites (`seedy@sites.test`) e não conecta ao ChatGPT. Essa simulação existe apenas no servidor local; o Site publicado usa a autenticação nativa. Não configure credenciais em arquivos versionados.

Verificações disponíveis:

```sh
npm run test:auth
npm run lint
npx tsc --noEmit
npm run build
```

Para atribuir a role `admin`, configure `TASK_AGENT_ADMIN_EXTERNAL_USER_IDS` nas variáveis de runtime do Site com uma lista separada por vírgulas de IDs externos. Não coloque essa configuração em componente de UI nem em variável `NEXT_PUBLIC_*`. Nenhum administrador inicial está configurado por padrão.

## Estrutura

- `app/`: rotas do Sign in, workspace protegido e shell da interface.
- `auth/`: identidade interna, serviço de autenticação e autorização por role.
- `components/`: shell autenticado, botão de entrada e ícones visuais compartilhados.
- `docs/architecture.md`: fluxo de identidade, sessão, roles e arquitetura do produto.
- `docs/roadmap.md`: escopo e estado de cada fase.
- `.openai/hosting.json`: identificador do Site; Worker runtime usado para proteger rotas no servidor.

Consulte [docs/architecture.md](docs/architecture.md) e [docs/roadmap.md](docs/roadmap.md) antes de ampliar o escopo. CRUD, Supabase, DeepSeek, integrações, administração funcional e dados reais continuam planejados.
