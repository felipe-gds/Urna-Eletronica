let seuVoto = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

//variavel de ambiente
let etapaAtual = 0;
let numero = '' //numero do candidato.
let votoBranco = false;
let votos = [];

function comecarEtapa(){
    let etapa = etapas[etapaAtual];

    let numeroHTML = '';
    numero = '';
    votoBranco = false;

    for (let i=0; i < etapa.numeros; i ++){
        if(i === 0){
            numeroHTML +='<div class="numero pisca"></div>';
        }else{
        numeroHTML += '<div class="numero"></div>'
        }
    }    

    seuVoto.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = ""
    aviso.style.display ='none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else {
            return false;
        }
    });
    
    if(candidato.length > 0){
        candidato = candidato[0]
        seuVoto.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        aviso.style.display = 'block';

        let fotoHTML = '';
        for(let i in candidato.fotos){
            fotoHTML +=  `<div class="d-1-image"><img src = "images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>'`
        }
        
        lateral.innerHTML = fotoHTML;
    } else {
        seuVoto.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
        aviso.style.display = 'block';        
    }

    
}

function clicou(n){
    let elementoNumero = document.querySelector('.numero.pisca');
    if( elementoNumero !== null){
        elementoNumero.innerHTML = n;

        numero = numero + n //concatenar os números digitados 

        elementoNumero.classList.remove('pisca'); // remove a classe pisca 
        if(elementoNumero.nextElementSibling !== null){
            elementoNumero.nextElementSibling.classList.add('pisca'); //acrescenta ao próximo elemento a classe pisca
        } else{
           atualizaInterface()
        }
        
    }
}

function branco(){
    votoBranco = true;
    numero = ''
    seuVoto.style.display = 'block';
    aviso.style.display ='block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
}

function corrige(){
    comecarEtapa();
}

function confirma(){
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco == true){
        votoConfirmado = true;
        //salvar em uma array os votos;
        votos.push({
            etapa: etapas[etapaAtual].titulo, 
            voto: 'Branco'
        })
    }else if (numero.length === etapa.numeros) {
        votoConfirmado = true;

        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    if(votoConfirmado){
        etapaAtual++; 
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        }else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM!</div>';
            console.log(votos)
        }
    }
}

comecarEtapa()