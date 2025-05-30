let duracao = null
let display = document.querySelector('#timer');
let intervalo = null;

const botaoIniciar = document.querySelector('#botaoIniciar');
const botaoPausar = document.querySelector('#botaoPausar');
const botaoReiniciar = document.querySelector('#botaoReiniciar');

const botaoFoco = document.querySelector('#botaoFoco');
const botaoDescanso = document.querySelector('#botaoDescanso');

botaoPausar.style.display = 'none';
botaoReiniciar.style.display = 'none';

//CONTAGEM MOSTRADA NA TELA
function atualizaTempo(){
    console.log("ENTREI NO ATUALIZAR TEMPO");
    let minutos = parseInt(timer /60, 10);
    let segundos = parseInt(timer % 60, 10);
        
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;
    display.innerHTML = `<h2>${minutos}:${segundos}</h2>`;
}

//
function iniciarContagem(){
    intervalo = setInterval(function (){
        if(timer>0){
            atualizaTempo();
            timer --;
        }else{
            musica = new Audio('../media/florentina.mp3');
            musica.play();
            clearInterval(intervalo);
            intervalo = null;
        }
    }, 1000);
}

//MOSTRAR OU ESCONDER BOTÕES
function esconderIniciar(){
    botaoIniciar.style.display = 'none';
    botaoPausar.style.display = 'inline-block';
    botaoReiniciar.style.display = 'inline-block';
}

function mostrarIniciar(){
    botaoIniciar.style.display = 'inline-block';
    botaoPausar.style.display = 'none';
    botaoReiniciar.style.display = 'none';
}

// AÇÃO DOS BOTÕES
function iniciar() {
    timer = duracao;
    iniciarContagem();
    esconderIniciar();
    console.log("ENTREI NO INICIAR");
}

function pausar() {
    console.log("ENTREI NO PAUSAR");

    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
        console.log(intervalo)
        botão = display.innerHTML = `<h2>Pausado</h2><br>
        <h3>Tempo restante: ${display.innerHTML}</h3>`;
        botaoPausar.innerHTML = `<h4>Continuar</h4>`;
 
    } else {
        iniciarContagem();
        botaoPausar.innerHTML = `<h4>Pausar</h4>`;
    }
}

function reiniciar(){
    console.log("ENTREI NO REINCIAR");
    clearInterval(intervalo);
    intervalo = null;
    mostrarIniciar();
    timer = duracao;
    atualizaTempo();
}

// Eventos dos Botões
botaoIniciar.addEventListener('click', iniciar);
botaoPausar.addEventListener('click', pausar);
botaoReiniciar.addEventListener('click', reiniciar);

// AÇÃO DOS BOTÕES DE FOCO E DESCANSO
botaoFoco.addEventListener('click', function(){
    botaoFoco.classList.add('active');
    botaoDescanso.classList.remove('active');

    clearInterval(intervalo);
    intervalo = null;
    mostrarIniciar();       
    duracao = (60 * 25); // 25 minutos
    timer = duracao;
    console.log("ENTREI NO FOCO");
    atualizaTempo();
})

botaoDescanso.addEventListener('click', function(){
    botaoDescanso.classList.add('active');
    botaoDescanso.style.color = '#fff';
    botaoFoco.classList.remove('active');
    
    clearInterval(intervalo);
    intervalo = null;
    mostrarIniciar();

    duracao = (60 * 5); // 5 minutos
    timer = duracao;
    console.log("ENTREI NO DESCANSO");
    atualizaTempo();
});

if(duracao === null){
    botaoIniciar.style.display = 'none';
}