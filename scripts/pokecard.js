const typeColor = {
    bug: "#A8B820",
    dragon: "#7038F8",
    electric: "#F8D030",
    fairy: "#FF0069",
    fighting: "#C03028",
    fire: "#F08030",
    flying: "#A890F0",
    grass: "#78C850",
    ground: "#E0C068",
    ghost: "#705898",
    ice: "#98D8D8",
    normal: "#A8A878",
    poison: "#A040A0",
    psychic: "#F85888",
    rock: "#B8A038",
    water: "#6890F0",
    dark: "#705848",
    steel: "#B8B8D0"
};

const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const newPoke = document.getElementById("new");
const forcePoke = document.getElementById("force");

let getPokeData = () => {
    let id = Math.floor(Math.random() * 251) + 1;
    const finalUrl = url + id;
    fetch(finalUrl)
        .then((response) => response.json())
        .then((data) => {
            genCard(data)
        });
};

let forcePokeData = () => {
    const finalUrl = url + document.getElementById("id").value;
    fetch(finalUrl)
        .then((response) => response.json())
        .then((data) => {
            genCard(data)
        });
};

// função para gerar os cards
let genCard = (data) => {
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpAttack = data.stats[3].base_stat;
    const statSpDefense = data.stats[4].base_stat;
    const statSpeed = data.stats[5].base_stat;
    const gameIndex = ('00' + data.id).slice(-3);


    card.innerHTML = `
        <p class="hp">
            <span>HP 
            ${hp}
            </span>
        </p>
            <img src=${imgSrc} />
            <h2 class="name-pokemon">
            #${gameIndex} - ${pokeName}
            </h2>
            <div class="types">

            </div>
            <div class="status">
                <div>
                    <h3>${statAttack}</h3>
                    <p>ATK</p>
                </div>
                <div>
                    <h3>${statDefense}</h3>
                    <p>DEF</p>
                </div>
                <div>
                    <h3>${statSpAttack}</h3>
                    <p>SP ATK</p>
                </div>
                <div>
                    <h3>${statSpDefense}</h3>
                    <p>SP DEF</p>
                </div>
                <div>
                    <h3>${statSpeed}</h3>
                    <p>SPD</p>
                </div>
            </div>
        `;
    appendTypes(data.types);

};

let appendTypes = (types) => {
    if (types.length === 2) {
        card.style.background = `radial-gradient(circle at 50% 0%, ${typeColor[types[1].type.name]}, ${typeColor[types[0].type.name]} 36%, #ffffff 36.1%)`;
    } else {
        card.style.background = `radial-gradient(circle at 50% 0%, ${typeColor[types[0].type.name]}, ${typeColor[types[0].type.name]} 36%, #ffffff 36.1%)`;
    }
    types.forEach((item) => {
        let span = document.createElement("SPAN")
        span.textContent = item.type.name;
        document.querySelector(".types").appendChild(span);
        span.style.backgroundColor = typeColor[item.type.name];
    });
};


newPoke.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);
forcePoke.addEventListener("click", forcePokeData);
document.getElementById("id").defaultValue = 1;
document.getElementById("id").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        forcePokeData();
    }
});