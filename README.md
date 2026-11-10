# Mamede Marketing

Página estática responsiva, em português, com os oito serviços fornecidos. HTML, CSS e JavaScript sem etapa de instalação ou compilação.

## Abrir
Execute `abrir-site.bat` ou abra `index.html` no navegador.

## Contatos
WhatsApp e e-mail estão vazios, conforme solicitado. Preencha `config.js` com os dados reais do cliente. WhatsApp deve conter somente números, com país e DDD. O formulário passa a abrir o WhatsApp; se apenas o e-mail estiver preenchido, abre o aplicativo de e-mail. O visitante revisa e envia a mensagem no aplicativo. Enquanto os contatos estiverem vazios, o formulário baixa um briefing em texto e informa que nada foi enviado. Não há servidor nem armazenamento de dados.

## Publicar no GitHub Pages
1. Instale o [Git](https://git-scm.com/downloads/win) e o [GitHub CLI](https://cli.github.com/), caso necessário.
2. Execute `publicar-github.bat` e conclua o login no navegador quando solicitado.
3. O script cria um repositório **público** chamado `mamede-marketing`, envia os arquivos e ativa o GitHub Pages na branch `main`, pasta raiz.
4. Os links reais do repositório e da página são mostrados e salvos em `links-publicados.txt`. A publicação pode levar alguns minutos. A janela abre a área de acompanhamento do GitHub.

Para atualizar, edite os arquivos e execute o mesmo `.bat`. Ele envia para o repositório configurado em `origin`, sem envio forçado. Se o nome já existir e a pasta ainda não estiver conectada, o script para para proteger projetos existentes. Não envie credenciais nesta pasta.

Alternativa manual, após criar um repositório vazio no GitHub:

```bat
git init -b main
git add index.html style.css script.js config.js favicon.svg .nojekyll .gitignore README.md abrir-site.bat publicar-github.bat
git commit -m "Cria site Mamede Marketing"
git remote add origin https://github.com/SEU_USUARIO/mamede-marketing.git
git push -u origin main
```

Depois, em Settings > Pages, selecione Deploy from a branch > main > / (root) e salve. Substitua SEU_USUARIO pelo seu usuário real. O link de GitHub Pages será informado nessa tela.

## Arquivos
- `index.html`: conteúdo, navegação e formulário.
- `style.css`: identidade visual e adaptação para celulares.
- `script.js`: briefing e canais de contato.
- `config.js`: contatos do cliente.
- `favicon.svg`: ícone da página.
- `.nojekyll`: publicação dos arquivos estáticos sem Jekyll.
- `abrir-site.bat` e `publicar-github.bat`: abertura e publicação no Windows.

As fontes do Google Fonts são opcionais: sem internet, o navegador usa as fontes de sistema. Nenhuma foto, estatística, depoimento ou cliente fictício foi incluído. A arte principal é uma composição gráfica em CSS.

## Redesign criativo
Layout editorial, tipografia expressiva e colagem original gerada com ImageGen. A pasta assets precisa acompanhar o HTML; já está incluída no .bat. Os estudos criativos são conceituais e não representam cases de clientes. A cena 3D da versão anterior não é utilizada. Não há bibliotecas JavaScript externas. Fontes Google opcionais com alternativas locais. Contatos preservados em branco.

### Direção da imagem original
Ferramenta: ImageGen nativo. Arquivo: assets/olhar-mamede.jpg.
Prompt: Create an exceptional art-directed editorial collage for a radically creative Brazilian marketing studio website. Landscape 3:2 composition, no typography, no letters, no watermark. A surreal cobalt blue sculptural hand holding an enormous chrome metallic eyeball with a bright blue iris, floating cut paper electric blue stars, small orange-red sphere, silver liquid ribbons and half-tone paper scraps, off-white warm paper background, black photocopy grain accents. Bold playful Dada meets contemporary luxury independent creative studio, tactile editorial photomontage, hard studio shadows, unexpectedly beautiful sculptural materials, balanced negative space, crisp premium finish. Main subject center. Palette electric cobalt #0755FF, warm white #F4F1E8, black, small acidic yellow accents. This is a finished visual artwork, not a website screenshot.
