# Biblioteca: md-links

## Índice

* [1. Backlog das implementações](#1-backlog-das-implementacoes)
* [2. Guia de uso e instalação](#2-guia-de-uso-e-instalacao)
* [3. Documentação técnica](#3-documentação-tecnica)
* [4. Exemplos](#4-exemplos)

***

## 1. Backlog das implementações

Md-links é uma biblioteca que lê um arquivo do tipo .md e retorna os links que esse arquivo contém na forma de um array de objetos. Essa biblioteca lê apenas arquivos individuais. 
É possível com a md-links descobrir se cada link dentro do arquivo do tipo .md está funcionando ou não através da opção --validate.
Através da opção --stats podemos ver estatísticas básicas sobre os links do arquivo e através da opção --stats --validate podemos ver mais estatísticas. 

## 2. Guia de uso e instalação

* Para possuir o módulo desta biblioteca deve-se instalar via npm com o seguinte comando: 
`npm install AmandaZaine/SAP004-md-links`.
* Comando para usar no terminal: `md-links 'caminho-até-o-arquivo' opções`.
* As opções são: --validate, --stats e --stats --validate (ou --validate --stats).
* Essa biblioteca pode ser usada na linha de comando.

## 3. Documentação técnica

* npm install AmandaZaine/SAP004-md-links

## 4. Exemplos

* Exemplo de retorno simples: apenas os links que o arquivo contém.
```sh
$ md-links './test/README4.md'
[
  {
    href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
    text: 'Ler um\r\n  diretório',
    file: './test/README4.md'
  },
  {
    href: 'https://nodejs.org/api/path.html',
    text: 'Path',
    file: './test/README4.md'
  },
  {
    href: 'https://medium.com/henriquekuwai/criando-sua-cli-com-node-js-d6dee7d03110',
    text: 'Criando sua CLI com\r\n  Node.js',
    file: './test/README4.md'
  },
  {
    href: 'https://www.laboratoria.la/asdf',
    text: 'Lab',
    file: './test/README4.md'
  }
]
```

* Exemplo com --validate: verifica quais links funcionam e quais não.

```sh
$ md-links './test/README4.md'  --validate
[
  {
    href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
    text: 'Ler um\r\n  diretório',
    file: './test/README4.md',
    Status: 'OK',
    StatusAxios: 200
  },
  {
    href: 'https://nodejs.org/api/path.html',
    text: 'Path',
    file: './test/README4.md',
    Status: 'OK',
    StatusAxios: 200
  },
  {
    href: 'https://medium.com/henriquekuwai/criando-sua-cli-com-node-js-d6dee7d03110',
    text: 'Criando sua CLI com\r\n  Node.js',
    file: './test/README4.md',
    Status: 'OK',
    StatusAxios: 200
  },
  {
    href: 'https://www.laboratoria.la/asdf',
    text: 'Lab',
    file: './test/README4.md',
    Status: 'Fail',
    StatusAxios: 404
  }
]
```

* Exemplo com --stats: mostra estatísticas básicas sobre os links do arquivo.

```sh
$ md-links './test/README4.md' --stats
Total de Links: 4 | Quantidade de Links Unicos: 4
```

* Exemplo com --stats --validate: mostra mais estatísticas sobre os links do arquivo.

```sh
$ md-links './test/README4.md' --stats --validate
Total de Links: 4 | Quantidade de Links Unicos: 4 | Quantidade de Links Quebrados: 1
```

