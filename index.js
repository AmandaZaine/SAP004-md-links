/*
module.exports = (path, options) => {
  // ...
};
*/

const fs = require("fs")
function mdLinks(path){

  fs.readFile(path, "utf8", (err, data) => {
    if(err){
      console.log(err)
    }else{
      const RegExQuePegaOsLinks = /\((http[s]?:.*)\)/gm;
      //const RegExQuePegaOsLinksEaDescricaoDoLink = /\[(\S.*)\]\((http[s]?:.*)\)/gm;
      //const RegExQuePegaOsLinksEaDescricaoDoLink = /\[([^\[]*)\]\((http[s]?:[A-Za-z0-9,-_#.]*)\)/gm;
      const RegExQuePegaOsLinksEaDescricaoDoLink = /\[([^\[]*)\]\((http[s]?:[A-Za-z0-9,-_#.@%]*)\)/gm;
      
      //Comparar o RegEx com o texto do arquivo
      //Pegar os links
      const arrayComTodosOsLinks = data.match(RegExQuePegaOsLinks)
      const arrayComTodosOsLinksEDescricaoDeCadaLink = data.match(RegExQuePegaOsLinksEaDescricaoDoLink)
      
      //console.log(arrayComTodosOsLinksEDescricaoDeCadaLink)

      const arrayDeObjetosDosLinks = []

      for(let descELink of arrayComTodosOsLinksEDescricaoDeCadaLink){
        //console.log(descELink)  
        
        const quebrarTexto = descELink.split('](')
        const descricaoDoLink = quebrarTexto[0].replace(/\[/, "")
        const descricaoDoLink2 = quebrarTexto[0]
        const linkLimpo = quebrarTexto[1].replace(/\)/g, "")

        //console.log(descricaoDoLink)
        //console.log(typeof descricaoDoLink2)
        //console.log(linkLimpo)
        //\\r && \\n

        let objectLink = { href: `${linkLimpo}`, text: `${descricaoDoLink}`, file: `${path}` }
        
        arrayDeObjetosDosLinks.push(objectLink)

      }

      //console.log(typeof arrayDeObjetosDosLinks[46])
      console.log(arrayDeObjetosDosLinks)
    }
  }) 
}

mdLinks("README.md")