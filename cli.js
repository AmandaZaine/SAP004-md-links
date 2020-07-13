#!/usr/bin/env node

const mdLinks = require("./index.js")

const file = process.argv[2];

//const validate = process.argv.includes('--validate');

    mdLinks(file, process.argv) .then((result)=>{
        
        console.log(result);

    }).catch((erro) => {
        erro = "Insira um arquivo .md para ser lido"
        console.log(erro)
    });