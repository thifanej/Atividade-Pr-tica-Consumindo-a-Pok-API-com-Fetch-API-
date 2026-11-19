

const formBusca = document.getElementById("form-busca");
const inputPokemon = document.getElementById("input-pokemon");
const mensagemStatus = document.getElementById("mensagem-status");
const cardPokemon = document.getElementById("card-pokemon");

const pokeId = document.getElementById("poke-id");
const pokeImg = document.getElementById("poke-img");
const pokeNome = document.getElementById("poke-nome");
const pokeTipo = document.getElementById("poke-tipo");

async function buscarPokemon(nomeOuId) {

    const termo = nomeOuId.toLowerCase().trim();

    const url = `https://pokeapi.co/api/v2/pokemon/${termo}`;

    mensagemStatus.textContent = "Buscando Pokémon...";

    cardPokemon.classList.add("oculto");

    try {

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado!");
        }

        const dados = await resposta.json();

        // 4. Exibindo os dados na tela
        pokeId.textContent = `#${dados.id}`;
        pokeNome.textContent = dados.name;

        pokeImg.src = dados.sprites.other["official-artwork"].front_default;

        const tipos = dados.types.map(item => item.type.name);
        pokeTipo.textContent = tipos.join(" / ");

        cardPokemon.classList.remove("oculto");

        mensagemStatus.textContent = "";

    } catch (erro) {

        mensagemStatus.textContent = erro.message;

    }
}


formBusca.addEventListener("submit", function(event) {


    event.preventDefault();


    buscarPokemon(inputPokemon.value);

});

