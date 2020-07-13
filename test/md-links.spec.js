const mdLinks = require('../index.js');

const mockResultado = [
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

const mockResultadoParaValidate = [
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


describe('mdLinks', () => {

  it('Deveria ser uma função', () => {
    expect(typeof mdLinks).toBe('function')
  })

  test('Deve retornar um array de objetos com informações básicas de cada link que está dentro do arquivo .md', () => {
    return mdLinks('./test/README4.md', "").then(data => {
      expect(data).toEqual(mockResultado);
    })
  })
  
  it('Deve retornar estatisticas básicas do arquivo .md sobre os links dentro dele', () => {  
    return expect(mdLinks('./test/README4.md', ["--stats"])).resolves.toBe("Total de Links: 4 | Quantidade de Links Unicos: 4")
  })

})

