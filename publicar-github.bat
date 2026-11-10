@echo off
setlocal
cd /d "%~dp0"
where git >nul 2>nul
if errorlevel 1 goto falta_git
where gh >nul 2>nul
if errorlevel 1 goto falta_gh
gh auth status >nul 2>nul
if errorlevel 1 (
  gh auth login --hostname github.com --git-protocol https --web
  if errorlevel 1 goto erro
)
gh auth setup-git
if errorlevel 1 goto erro
for /f "delims=" %%U in ('gh api user --jq .login') do set "OWNER=%%U"
if not defined OWNER goto erro
if not exist ".git" (
  git init -b main
  if errorlevel 1 goto erro
)
git config user.name >nul 2>nul
if errorlevel 1 git config user.name "%OWNER%"
git config user.email >nul 2>nul
if errorlevel 1 git config user.email "%OWNER%@users.noreply.github.com"
set "CURRENT_BRANCH="
for /f "delims=" %%B in ('git symbolic-ref --short HEAD') do set "CURRENT_BRANCH=%%B"
if not "%CURRENT_BRANCH%"=="main" (
  echo Execute este arquivo na branch main. Nenhuma branch foi alterada.
  goto erro
)
git add index.html style.css script.js assets config.js favicon.svg .nojekyll .gitignore README.md abrir-site.bat publicar-github.bat
if errorlevel 1 goto erro
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "Atualiza site Mamede Marketing"
  if errorlevel 1 goto erro
)
git remote get-url origin >nul 2>nul
if errorlevel 1 (
  gh repo view "%OWNER%/mamede-marketing" >nul 2>nul
  if not errorlevel 1 (
    echo O repositorio mamede-marketing ja existe. Para evitar sobrescrever outro projeto, conecte o repositorio correto manualmente.
    goto erro
  )
  echo Criando repositorio publico: %OWNER%/mamede-marketing
  gh repo create "%OWNER%/mamede-marketing" --public --source=. --remote=origin
  if errorlevel 1 goto erro
)
for /f "delims=" %%R in ('gh repo view --json nameWithOwner --jq .nameWithOwner') do set "REPO=%%R"
if not defined REPO goto erro
echo Publicando no repositorio %REPO%...
git push -u origin main
if errorlevel 1 goto erro
gh api "repos/%REPO%/pages" >nul 2>nul
if errorlevel 1 (
  gh api --method POST "repos/%REPO%/pages" -f "build_type=legacy" -f "source[branch]=main" -f "source[path]=/"
) else (
  gh api --method PUT "repos/%REPO%/pages" -f "build_type=legacy" -f "source[branch]=main" -f "source[path]=/"
)
if errorlevel 1 goto erro_pages
echo Repositorio: https://github.com/%REPO%>links-publicados.txt
gh api "repos/%REPO%/pages" --jq .html_url >>links-publicados.txt
echo.
echo Publicacao solicitada. O GitHub pode levar alguns minutos para disponibilizar a pagina.
type links-publicados.txt
start "" "https://github.com/%REPO%/actions"
pause
exit /b 0
:falta_git
echo Instale o Git: https://git-scm.com/downloads/win
goto erro
:falta_gh
echo Instale o GitHub CLI: https://cli.github.com/
goto erro
:erro_pages
echo Os arquivos foram enviados, mas o Pages nao foi ativado.
echo Abra https://github.com/%REPO%/settings/pages e selecione Deploy from a branch, main, / root.
goto erro
:erro
echo Operacao interrompida. Confira a mensagem acima. Nenhum envio forcado foi realizado.
pause
exit /b 1
