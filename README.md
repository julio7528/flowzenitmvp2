# Task Agent

Sistema de gerenciamento de tarefas planejado para que a pessoa possa organizar, criar e acompanhar tarefas principalmente por linguagem natural. Um agente de IA deverá interpretar pedidos e propor dados estruturados; a aplicação continuará responsável por validar, autorizar e executar as operações.

## Estado do projeto

**Fase atual: Fase 2 — estrutura visual inicial e design system, concluída.** O Site agora tem um shell responsivo com navegação entre páginas-base e padrões visuais reutilizáveis. Essas áreas ainda são estados vazios; tarefas, agente, conta, calendário e administração não executam operações.

O Site está publicado de forma privada em [task-agent.julio7528.chatgpt.site](https://task-agent.julio7528.chatgpt.site). A autenticação, persistência, chamadas de IA, validação e autorização executáveis, administração e Google Calendar continuam planejados.

O projeto está versionado na branch main do repositório público [julio7528/flowzenitmvp2](https://github.com/julio7528/flowzenitmvp2), conforme autorizado.

## Stack planejada

| Componente | Estado |
| --- | --- |
| ChatGPT Sites | Serve a interface estática em dist/. |
| GitHub | Repositório público julio7528/flowzenitmvp2, branch main. |
| Sign in with ChatGPT | Planejado; não implementado. |
| Supabase / PostgreSQL | Persistência planejada; não conectada. |
| DeepSeek API | Provider de IA planejado; sem chamadas ou credenciais configuradas. |
| Google Calendar | Integração planejada; não conectada. |

## Estrutura atual

- app/, components/ e lib/: estrutura existente do starter Sites/Vinext, mantida para evolução na stack nativa.
- dist/index.html: shell semântico, navegação e páginas-base.
- dist/styles.css: tokens visuais, layout responsivo e padrões reutilizáveis de interface.
- dist/app.js: navegação local por hash e comportamento do menu recolhível em telas menores.
- docs/architecture.md: arquitetura, limites de responsabilidade e decisões visuais desta fase.
- docs/roadmap.md: fases planejadas e estado atual.
- .openai/hosting.json: configuração do diretório estático usado pelo Site.

As pastas e arquivos existentes foram preservados. Módulos de domínio, serviços de aplicação, agente, ações e integrações serão adicionados quando uma fase precisar deles; não há diretórios vazios criados para antecipar funcionalidades.

## Desenvolvimento local

Para visualizar a interface estática, com Python 3:

    python3 -m http.server 4173 --directory dist

Depois, abra http://localhost:4173. Para trabalhar no código-fonte do starter Sites/Vinext, o projeto declara Node.js >=22.13.0 e contém os scripts npm run dev, npm run build e npm run lint; a interface em dist/ não precisa de instalação ou build para a visualização acima.

Nenhuma variável de ambiente é necessária nesta fase. Por isso, ainda não há .env.example; a configuração de secrets será documentada junto à primeira fase que realmente introduzir configuração de servidor.

## Arquitetura e segurança

Consulte [docs/architecture.md](docs/architecture.md) antes de implementar novas camadas e [docs/roadmap.md](docs/roadmap.md) para conferir o escopo das fases. A regra principal é: **a IA interpreta e propõe; a aplicação valida, autoriza e executa**. A interface atual é apenas apresentação e navegação; não representa autenticação ou autorização. Secrets de providers e integrações nunca devem ser enviados ao navegador nem versionados.
