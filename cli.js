#!/usr/bin/env node

const mdLinks = require("./index.js")

const file = process.argv[2];

    mdLinks(file, process.argv) .then((result)=>{
        
        console.log(result);

    }).catch((erro) => {
        erro = "CLI: Insira um arquivo .md para ser lido"
        console.log(erro)
    })
