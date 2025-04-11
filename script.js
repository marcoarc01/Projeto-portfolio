const nome = "Marco Antônio Arcoverde";
const nomeEscrevendo = document.getElementById("nome");
let i = 0;
let apagando = false;

function escreverNome() {
    if (!apagando) {
        nomeEscrevendo.textContent = nome.slice(0, i + 1);
        i++;
        if (i === nome.length) {
            apagando = true;
            setTimeout(escreverNome, 1500);
            return;
        }
    } else {
        nomeEscrevendo.textContent = nome.slice(0, i - 1);
        i--;
        if (i === 1) {
            apagando = false;
        }
    }
    setTimeout(escreverNome, 150);
}

escreverNome();

const selectTema = document.getElementById("tema");

selectTema.addEventListener("change", function () {
    if (this.value === "escuro") {
        document.body.classList.add("escuro");
    } else {
        document.body.classList.remove("escuro");
    }
});


const username = "marcoarc01";
fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("repos");
        const repos = data.slice(0, 6);
        repos.forEach(repo => {
            const card = document.createElement("div");
            card.className = "repo-card";
            card.innerHTML = `
                <div class="repo-title">
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" class="github">
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                
                </div>
                <div>
                    <a href="${repo.html_url}" target="_blank">
                        <img class="repo-img" src="images/repo-img-github.png">
                    </a>
                </div>
                `;
            container.appendChild(card);
        });
    });


const contatos = [
    {
        img: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
        link: "https://github.com/marcoarc01",
        class: "github"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
        link: "https://www.linkedin.com/in/marco-antonio-arcoverde/",
        class: "linkedin"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/512/561/561127.png",
        link: "mailto:arcoverde.marco@hotmail.com",
        class: "email"
    }
];


let atual = 0;
const imgCont = document.getElementById("imgContato");
const linkCont = document.getElementById("linkContato");

function atualizarContato() {
    imgCont.src = contatos[atual].img;
    linkCont.href = contatos[atual].link;
    imgCont.className = contatos[atual].class;

}

function mover(direcao) {
    atual = (atual + direcao + contatos.length) % contatos.length;
    atualizarContato();
}

atualizarContato();

document.querySelector('#setaBaixo').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#projetos').scrollIntoView({ behavior: 'smooth' });
});

let senha = gerarSenha();

function gerarSenha() {
    const digitos = [];
    while (digitos.length < 4) {
        const num = Math.floor(Math.random() * 10);
        if (!digitos.includes(num)) {
            digitos.push(num);
        }
    }
    return digitos;
}

function verificarTentativa() {
    const entrada = document.getElementById("tentativa").value;
    if (!/^\d{4}$/.test(entrada)) {
        alert("Digite exatamente 4 dígitos numéricos.");
        return;
    }

    const tentativa = entrada.split("").map(Number);
    let acertos = 0;
    let erros = 0;

    tentativa.forEach((num, i) => {
        if (num === senha[i]) {
            acertos++;
        } else if (senha.includes(num)) {
            erros++;
        }
    });

    if (acertos === 4) {
        alert("Você venceu!");
    }

    const historico = document.getElementById("historicoTentativas");
    const item = document.createElement("li");
    item.textContent = `${entrada} → ${acertos} acertos, ${erros} erros`;
    historico.prepend(item);
    document.getElementById("tentativa").value = "";
}

function mostrarResposta() {
    alert(`A senha secreta é: ${senha.join("")}`);
}

function reiniciarJogo() {
    senha = gerarSenha();
    document.getElementById("tentativa").value = "";
    document.getElementById("historicoTentativas").innerHTML = "";
    alert("Jogo reiniciado!");
}
