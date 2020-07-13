const lerArquivoMD = require('./funcoes.js');

const fs = require("fs")
let axios = require('axios');

function mdLinks(caminho, opcao){

  return new Promise((resolve, reject) => {

    lerArquivoMD(caminho).then((linksEmObjetos) => {
      
        function statusDoLink(arrayDeLinkEmObjetos){
          return new Promise((resolve) => {
  
            let buscaLink = (link) => axios.get(link.href).catch( 
              (erro) => {
                return { status: erro.response.status } 
              } 
            )
            
            let arrayDePromises = []; 
            
            arrayDeLinkEmObjetos.forEach((item) => {
              arrayDePromises.push(buscaLink(item))
            })
              
            return Promise.all(arrayDePromises).then((arrayFinal) => {
            
              arrayFinal.forEach((statusDoLink, indice) => {
                if(statusDoLink.status == 200){
                  arrayDeLinkEmObjetos[indice]["Status"] = statusDoLink.statusText;
                  arrayDeLinkEmObjetos[indice]["StatusAxios"] = statusDoLink.status;
                }else{
                  arrayDeLinkEmObjetos[indice]["Status"] = "Fail";
                  arrayDeLinkEmObjetos[indice]["StatusAxios"] = statusDoLink.status;
                }
              })
  
              return resolve(arrayDeLinkEmObjetos);
  
            }).catch((erro) => {
                erro = "Erro"
                console.log(erro)
            })           
          })
        }

        function quantidadeDeLinksUnicos(linksEmObjetosParametro){

          const arrayDeLinks = [];

            for(let link of linksEmObjetosParametro){
              arrayDeLinks.push(link.href)
            }

            let linksUnicos = [];

            for(let linkUnico of arrayDeLinks){
              var indices = []
              var array = arrayDeLinks
              var elemento = linkUnico
              var idx = array.indexOf(elemento)

              while (idx != -1) {
              indices.push(idx);
              idx = array.indexOf(elemento, idx + 1);
              }

              if(indices.length === 1){
                linksUnicos.push(linkUnico)
              }else{

                if(!linksUnicos.includes(linkUnico)){
                  linksUnicos.push(linkUnico)
                }
              }
            }

            return (linksUnicos.length);

        }

        function quantidadeDeLinksQuebrados(resultadoParametro){
            
            const arrayDeStatusDosLinks = []

            resultadoParametro.forEach((cadaLink) => {
              //console.log(cadaLink.Status)
              arrayDeStatusDosLinks.push(cadaLink.Status)
            })

            let linksQuebrados = 0;

            for(let linkUnicoStatus of arrayDeStatusDosLinks){

              if(linkUnicoStatus !== "OK"){
                linksQuebrados++
              }
            }

            return (linksQuebrados)
        }

        if(opcao.includes("--stats") && opcao.includes("--validate")){

          statusDoLink(linksEmObjetos).then((resultado) => {

            return resolve(`Total de Links: ${linksEmObjetos.length} | Quantidade de Links Unicos: ${quantidadeDeLinksUnicos(linksEmObjetos)} | Quantidade de Links Quebrados: ${quantidadeDeLinksQuebrados(resultado)}`);

          })

        }else if(opcao.includes("--validate")){

          statusDoLink(linksEmObjetos).then((resultado) => {
            return resolve(resultado);
          })

        }else if(opcao.includes("--stats")){

          return resolve(
            `Total de Links: ${linksEmObjetos.length} | Quantidade de Links Unicos: ${quantidadeDeLinksUnicos(linksEmObjetos)}`
            )

        }else{

          return resolve(linksEmObjetos)

        }

    }).catch((erro) => {
      erro = "INDEX.JS: Insira um arquivo .md para ser lido"
      reject(erro)
    })
  })
}

module.exports = mdLinks;