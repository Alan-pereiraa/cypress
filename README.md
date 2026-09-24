# Projeto Qualidade

Sistema de cadastro de produtos com login, CRUD completo, PHP no backend e frontend separado. A aplicação foi criada para servir como projeto real nas aulas de qualidade de software.

## Estrutura

```text
front/                 Interface web estática e modular
  public/              Arquivos acessíveis pelo navegador
    index.html
    assets/
      css/styles.css
      js/
        app.js
        api/http-client.js
        modules/health.js
back/                  API PHP modular
  public/index.php      Ponto de entrada HTTP
  src/
    Config/             Configurações da aplicação
    Http/               Request, response e roteador
    Modules/            Módulos por domínio
      Auth/             Login e validação de token
      Health/
        HealthController.php
        HealthService.php
      Products/         CRUD de produtos e persistência JSON
  data/products.json   Dados locais do cadastro
```

## Requisitos

- Navegador moderno
- No primeiro uso, o `./start` tenta instalar PHP e Python automaticamente, sem exigir `sudo` no comando:
  - macOS: Homebrew
  - Linux: `apt`, `dnf` ou `pacman`
  - Windows: Git Bash com `winget`

## Executar a API

Você pode executar tudo com um único comando:

```bash
./start
```

Se alguma dependência estiver ausente, o `start` chama o `build` automaticamente.

Também é possível preparar o ambiente manualmente:

```bash
./build
```

O `build` instala as dependências do sistema. O `start` somente inicia a API em `http://localhost:8000` e o frontend em `http://localhost:5500`. Pressione `Ctrl+C` para encerrar os dois servidores.

Para executar somente a API:

```bash
php -S localhost:8000 -t back/public
```

Teste no navegador ou no terminal:

```bash
curl http://localhost:8000/api/health
```

## Executar o frontend

Em outro terminal:

```bash
python3 -m http.server 5500 -d front/public
```

Abra http://localhost:5500.

O frontend espera encontrar a API em `http://localhost:8000`. Essa URL fica centralizada em `front/public/assets/js/api/http-client.js` para facilitar mocks e troca de ambiente nas aulas.

## Acesso inicial

- Usuário: `admin`
- Senha: `admin123`

O sistema permite listar e buscar produtos, cadastrar, editar e excluir registros. Os dados ficam em `back/data/products.json`, sem necessidade de banco para começar.

## Próximos incrementos para as aulas

- Adicionar PHPUnit em `back/tests` para testar serviços e controllers.
- Adicionar Cypress em `front` para testar a interface pelo navegador.
- Criar adaptadores de mock para a camada HTTP do frontend.
- Adicionar novos domínios em `back/src/Modules` sem misturar regras de negócio no roteador.
