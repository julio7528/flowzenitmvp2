# Task Agent

Sistema de gerenciamento de tarefas planejado para que a pessoa possa organizar, criar e acompanhar tarefas principalmente por linguagem natural. Um agente de IA deverá interpretar pedidos e propor dados estruturados; a aplicação continuará responsável por validar, autorizar e executar as operações.

## Estado do projeto

**Fase atual: Fase 1 — GitHub e estrutura inicial, concluída localmente.** A Fase 0 definiu a arquitetura. A Fase 1 preparou documentação e versionamento local. A Fase 2 ainda não começou.

O shell estático inicial está publicado como um ChatGPT Site privado: [task-agent.julio7528.chatgpt.site](https://task-agent.julio7528.chatgpt.site). Ele não oferece operações de tarefas. Autenticação, persistência, chamadas de IA, validação executável, autorização de ações, administração e Google Calendar ainda não foram implementados.

O projeto está versionado localmente na branch `main`, com `origin` apontando para [`julio7528/flowzenitmvp2`](https://github.com/julio7528/flowzenitmvp2). O repositório é público, conforme autorizado para esta publicação.

## Stack planejada

| Componente | Estado |
| --- | --- |
| ChatGPT Sites | Hospeda o shell estático atual. |
| GitHub | Repositório público `julio7528/flowzenitmvp2`, branch `main`. |
| Sign in with ChatGPT | Planejado; não implementado. |
| Supabase / PostgreSQL | Persistência planejada; não conectada. |
| DeepSeek API | Provider de IA planejado; sem chamadas ou credenciais configuradas. |
| Google Calendar | Integração planejada; não conectada. |

## Estrutura atual

- `app/`, `components/` e `lib/`: estrutura existente do starter Sites/Vinext, mantida para evolução na stack nativa.
- `dist/`: HTML, CSS e favicon do shell que o ChatGPT Sites serve atualmente; são os arquivos necessários para reproduzir a publicação atual.
- `docs/architecture.md`: arquitetura e limites de responsabilidade definidos na Fase 0.
- `docs/roadmap.md`: fases planejadas e estado atual.
- `.openai/hosting.json`: configuração do diretório estático usado pelo Site.

As pastas e arquivos existentes foram preservados. Módulos de domínio, serviços de aplicação, agente, ações e integrações serão adicionados quando uma fase precisar deles; não há diretórios vazios criados para antecipar funcionalidades.

## Desenvolvimento local

Para visualizar o shell atualmente publicado, com Python 3:

```bash
python3 -m http.server 4173 --directory dist
```

Depois, abra `http://localhost:4173`. Para trabalhar no código-fonte do starter Sites/Vinext, o projeto declara Node.js `>=22.13.0` e contém os scripts `npm run dev`, `npm run build` e `npm run lint`; o shell estático em `dist/` não precisa de instalação ou build para a visualização acima.

Nenhuma variável de ambiente é necessária nesta fase. Por isso, ainda não há `.env.example`; configuração de secrets será documentada junto à primeira fase que realmente introduzir configuração de servidor.

## Arquitetura e segurança

Consulte [docs/architecture.md](docs/architecture.md) antes de implementar novas camadas e [docs/roadmap.md](docs/roadmap.md) para conferir o escopo das fases. A regra principal é: **a IA interpreta e propõe; a aplicação valida, autoriza e executa**. Secrets de providers e integrações nunca devem ser enviados ao navegador nem versionados.
