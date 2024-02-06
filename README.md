# Guia de Uso - Aplicativo de Perguntas e Respostas

## Instalação
1. Baixe o Código-Fonte/Faça o clone do repositório:
https://github.com/Maycondev01/perguntasErespostas.git

## Instale as Dependências:
Que consta no arquivo package.json.

## Vá até o repositorio:
cd nome-do-repositorio

## Configuração do Banco de Dados
Certifique-se de ter um banco de dados MySQL configurado.

### Abra o arquivo database/database.js e ajuste as configurações de conexão de acordo com as informações do seu banco de dados.

const connection = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    // ...
});

## Inicie o Servidor:
Use o seguinte comando para iniciar o servidor: node index.js ou npm start.

## Acesse o Aplicativo:

Abra seu navegador e acesse http://localhost:3000.
**Explore:** Navegue pelo aplicativo, faça perguntas, forneça respostas e explore as funcionalidades.
## Contribuição
Contribuições são bem-vindas! Se encontrar algum problema ou tiver sugestões, abra uma issue ou envie um pull request.
