

const livros = [
    { titulo: "Confissões", autor: "Santo Agostinho", imagem: "confissoes.jpg" },
    { titulo: "O Outono da Idade Média", autor: "Johan Huizinga", imagem: "outono-idade-media.jpg" },
    { titulo: "O Retrato de Dorian Gray", autor: "Oscar Wilde", imagem: "dorian-gray.jpg" },
    { titulo: "Orlando", autor: "Virginia Woolf", imagem: "orlando.jpg" },
    { titulo: "O Grande Gatsby", autor: "F. Scott Fitzgerald", imagem: "grande-gatsby.jpg" },
    { titulo: "O Príncipe", autor: "Nicolau Maquiavel", imagem: "o-principe.jpg" },
    { titulo: "1984", autor: "George Orwell", imagem: "1984.jpg" },
    { titulo: "O Quarto de Jacob", autor: "Virginia Woolf", imagem: "quarto-jacob.jpg" },
    { titulo: "Frankenstein", autor: "Mary Shelley", imagem: "frankenstein.jpg" },
    { titulo: "O Idiota", autor: "Fiódor Dostoiévski", imagem: "o-idiota.jpg" },
    { titulo: "Orgulho e Preconceito", autor: "Jane Austen", imagem: "orgulho-preconceito.jpg" },
    { titulo: "O Morro dos Ventos Uivantes", autor: "Emily Brontë", imagem: "morro-ventos-uivantes.jpg" },
    { titulo: "Romeu e Julieta", autor: "William Shakespeare", imagem: "romeu-julieta.jpg" },
    { titulo: "Ilíada", autor: "Homero", imagem: "iliada.jpg" },
    { titulo: "Odisseia", autor: "Homero", imagem: "odisseia.jpg" },
    { titulo: "Os Irmãos Karamázov", autor: "Fiódor Dostoiévski", imagem: "irmaos-karamazov.jpg" },
    { titulo: "Drácula", autor: "Bram Stoker", imagem: "dracula.jpg" },
    { titulo: "Jane Eyre", autor: "Charlotte Brontë", imagem: "jane-eyre.jpg" },
    { titulo: "Meditações", autor: "Marco Aurélio", imagem: "meditacoes.jpg" },
    { titulo: "O Manifesto do Partido Comunista", autor: "Karl Marx e Friedrich Engels", imagem: "manifesto-comunista.jpg" }
];

const selecionados = [];

const prateleiras = [
    document.getElementById("prateleira-1"),
    document.getElementById("prateleira-2"),
    document.getElementById("prateleira-3")
];

livros.forEach((livro, indice) => {
    const numeroPrateleira = Math.floor(indice / 5);

    if (!prateleiras[numeroPrateleira]) {
        const novaPrateleira = document.createElement("div");
        novaPrateleira.className = "prateleira";

        const novaLista = document.createElement("div");
        novaLista.className = "livros";
        novaLista.id = `prateleira-${numeroPrateleira + 1}`;

        novaPrateleira.appendChild(novaLista);
        document.querySelector(".estante").appendChild(novaPrateleira);

        prateleiras[numeroPrateleira] = novaLista;
    }

    const capa = document.createElement("div");
    capa.className = "livro";

    const imagem = document.createElement("img");
    imagem.src = `imagens/${livro.imagem}`;
    imagem.alt = `Capa de ${livro.titulo}`;

    imagem.onerror = () => {
        capa.innerHTML = `<div class="capa-provisoria">${livro.titulo}</div>`;
    };

    capa.appendChild(imagem);

    capa.addEventListener("click", () => {
        const posicao = selecionados.findIndex(item => item.titulo === livro.titulo);

        if (posicao === -1) {
            selecionados.push(livro);
            capa.classList.add("selecionado");
        } else {
            selecionados.splice(posicao, 1);
            capa.classList.remove("selecionado");
        }

        atualizarLista();
    });

    prateleiras[numeroPrateleira].appendChild(capa);
});

function atualizarLista() {
    const lista = document.getElementById("lista-leitura");
    const contador = document.getElementById("contador");

    lista.innerHTML = "";

    if (selecionados.length === 0) {
        lista.innerHTML = '<p class="lista-vazia">Sua lista de leitura está vazia...</p>';
    }

    selecionados.forEach(livro => {
        const item = document.createElement("div");
        item.className = "item-lista";

        item.innerHTML = `
            <div class="info-livro">
                <strong>${livro.titulo}</strong>
                <span>${livro.autor}</span>
            </div>
            <button class="remover-livro">×</button>
        `;

        item.querySelector("button").addEventListener("click", () => {
            const capa = [...document.querySelectorAll(".livro")].find(elemento =>
                elemento.querySelector("img")?.alt === `Capa de ${livro.titulo}`
            );

            if (capa) capa.classList.remove("selecionado");

            selecionados.splice(selecionados.indexOf(livro), 1);
            atualizarLista();
        });

        lista.appendChild(item);
    });

    contador.textContent = `${selecionados.length} livros selecionados`;
}
