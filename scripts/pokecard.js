const typeColor = {
    bug: "#91c02d",
    dragon: "#096cc2",
    electric: "#f4d23b",
    fairy: "#ec8fe7",
    fighting: "#cf3e6a",
    fire: "#ff9d53",
    flying: "#95abdd",
    grass: "#63ba5d",
    ground: "#d97647",
    ghost: "#5368ac",
    ice: "#72ccbf",
    normal: "#9098a2",
    poison: "#ac69c7",
    psychic: "#f87076",
    rock: "#c6b68d",
    water: "#4d90d6",
    dark: "#5b5364",
    steel: "#5a8fa1"
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
        card.style.background = `radial-gradient(circle at 50% 0%, transparent, transparent 36%, white 36.1%), linear-gradient(115deg, ${typeColor[types[0].type.name]}, ${typeColor[types[1].type.name]} 66%)`;
        //card.style.background = `radial-gradient(circle at 50% 0%, transparent, transparent 36%, white 36.1%), linear-gradient(115deg, ${typeColor[types[0].type.name]}, ${typeColor[types[0].type.name]} 32%, ${typeColor[types[1].type.name]} 32.1%)`;
        //card.style.background = `radial-gradient(circle at 50% 0%, ${typeColor[types[1].type.name]}, ${typeColor[types[1].type.name]} 18%, ${typeColor[types[0].type.name]} 18.1%, ${typeColor[types[0].type.name]} 36%, white 36.1%)`;
    } else {
        card.style.background = `radial-gradient(circle at 50% 0%,${typeColor[types[0].type.name]} 36%, white 36.1%)`;
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