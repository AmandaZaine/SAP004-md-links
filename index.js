/*
module.exports = (path, options) => {
};

//const RegExQuePegaOsLinksEaDescricaoDoLink = /\[(\S.*)\]\((http[s]?:.*)\)/gm;
//const RegExQuePegaOsLinksEaDescricaoDoLink = /\[([^\[]*)\]\((http[s]?:[A-Za-z0-9,-_#.]*)\)/gm;
*/

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
                  arrayDeLinkEmObjetos[indice]["Status"] = "Link Quebrado";
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

        if(opcao.includes("--validate")){

        statusDoLink(linksEmObjetos).then((resultado) => {
          return resolve(resultado);
        })

        }else{

          return resolve(linksEmObjetos)

        }

    }).catch((erro) => {
      erro = "Insira um arquivo .md para ser lido"
      reject(erro)
    })

  })

}

//mdLinks("README.md")

module.exports = mdLinks;