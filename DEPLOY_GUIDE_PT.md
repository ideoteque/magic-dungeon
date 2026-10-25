# Magic Dungeon — GitHub Pages (guia de publicação)

## Decisão
GitHub (histórico e revisão) + GitHub Actions (testes) + GitHub Pages (HTTPS) + Codex (desenvolvimento).

## Publicação inicial
1. Criar repositório **público** `magic-dungeon` no GitHub. Não adicionar ficheiros de inicialização, para evitar conflitos.
2. Carregar **o conteúdo desta pasta**, incluindo `.github/workflows/pages.yml`, para a branch `main` (a pasta `.github` é oculta em alguns gestores de ficheiros).
3. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
4. Actions → confirmar que `Test and deploy Magic Dungeon` terminou com sucesso.
5. Settings → Pages mostra o endereço, habitualmente `https://UTILIZADOR.github.io/magic-dungeon/`.

**Atenção:** GitHub Pages gratuito num repositório público implica código acessível ao público. Não publicar materiais privados ou licenciados sem autorização. Não foi criada conta, repositório nem publicação nesta entrega.

## Próximas versões
Criar branch por Alpha, correr testes, rever diff do PLAY/Studio, abrir Pull Request para `main`; merge só após aprovação. O workflow só publica `main` após testes aprovados.

## Ficheiros importantes
- `index.html`: Rules Lab v0.29
- `legacy-play-v0.6.html`: PLAY aprovado, não alterar
- `board-studio.html`: Studio congelado, não alterar
- `src/`: motor e suporte
- `tests/`: testes Node

## Limites
O Rules Lab é uma alpha técnica e nem todas as 88 cartas estão implementadas. Testes Node não substituem testes no Safari. O endereço HTTPS só existirá depois da publicação real.
