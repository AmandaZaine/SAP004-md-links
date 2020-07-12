

const lerArquivoMD = (pathParametro) => {
    return new Promise((resolvido, rejeitado) => {
        const fs = require("fs")
        fs.readFile(pathParametro, "utf8", (erro, data) => {
            if(erro){
            console.log(erro)
            return rejeitado(erro)

            }else{
    
                const RegExQuePegaOsLinksEaDescricaoDoLink = /\[([^\[]*)\]\((http[s]?:[A-Za-z0-9,-_#.@%]*)\)/gm;
                
                const arrayComTodosOsLinksEDescricaoDeCadaLink = data.match(RegExQuePegaOsLinksEaDescricaoDoLink)
                
                const arrayDeObjetosDosLinks = []

                for(let descELink of arrayComTodosOsLinksEDescricaoDeCadaLink){
                    
                    const quebrarTexto = descELink.split('](')
                    const descricaoDoLink = quebrarTexto[0].replace(/\[/, "")
                    const linkLimpo = quebrarTexto[1].replace(/\)/g, "")

                    let objectLink = { href: `${linkLimpo}`, text: `${descricaoDoLink}`, file: `${pathParametro}`}
                    
                    arrayDeObjetosDosLinks.push(objectLink)                   
                }

                return resolvido(arrayDeObjetosDosLinks);
            }
        })
    })
}

module.exports = lerArquivoMD;