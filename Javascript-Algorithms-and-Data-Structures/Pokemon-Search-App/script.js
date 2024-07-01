const pokemonsUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"

const searchInput = document.getElementById("search-input");
const pokemonNameDisplay = document.getElementById("pokemon-name");
const pokemonIdDisplay = document.getElementById("pokemon-id");
const weightDisplay = document.getElementById("weight");
const heightDisplay = document.getElementById("height");
const hpDisplay = document.getElementById("hp");
const attackDisplay = document.getElementById("attack");
const defenseDisplay = document.getElementById("defense");
const specialAttackDisplay = document.getElementById("special-attack");
const specialDefenseDisplay = document.getElementById("special-defense");
const speedDisplay = document.getElementById("speed");
const typesDisplay = document.getElementById("types");
const imgDiv = document.getElementById("img-div");
const searchButton = document.getElementById("search-button");

const search = () => {
  const searchStr = searchInput.value.toLowerCase().replaceAll(/[^\da-z- ]/g, "").replaceAll(/ /g, "-");
  const endpoint = `${pokemonsUrl}/${searchStr}`;
  fetch(endpoint)
  .then((res) => res.json())
  .then((data) => setDisplay(data))
  .catch((err) => {alert("Pokémon not found");
console.log(err)});
  searchButton.classList.add("shake");
  searchButton.disabled = true;
  setTimeout(() => {
    searchButton.classList.remove("shake")
    searchButton.disabled = false;
    }, 1500
  );
}

const setDisplay = (data) => {
    
  const {name, id, weight, height, sprites, types, stats} = data;
  const [hp, attack, defense, specialAttack, specialDefense, speed] = stats.map(e => e.base_stat);
  const {front_default} = sprites;
  
  pokemonNameDisplay.textContent = name.toUpperCase();
  pokemonIdDisplay.textContent = `#${id}`;
  
  weightDisplay.textContent = weight;
  heightDisplay.textContent = height;
  hpDisplay.textContent = hp;
  
  attackDisplay.textContent = attack;
  defenseDisplay.textContent = defense;
  
  specialAttackDisplay.textContent = specialAttack;
  specialDefenseDisplay.textContent = specialDefense;
  speedDisplay.textContent = speed;
  imgDiv.innerHTML = "";
  
  const pokemonImg = imgDiv.appendChild(document.createElement("img"));
  pokemonImg.id="sprite";
  pokemonImg.src = front_default;
  pokemonImg.width = "150";
  pokemonImg.height = "150";
  pokemonImg.style.objectFit = "cover";
  pokemonImg.alt = `Image of ${name}`;
  displayTypes(types);
  myRadarChart.destroy();
  myRadarChart = drawRadar([speed, defense, specialDefense, specialAttack, attack]);
}

const displayTypes = (types) => {
  typesDisplay.innerHTML = "";
  types.forEach((type, i) => {
    typesDisplay.innerHTML += `<p class=${type.type.name}>${type.type.name}</p>`
  });
}

const drawRadar = (arr = []) => {
    let ctx = document.getElementById('radar-chart').getContext('2d');
    let myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels:
                ['Speed', 'Defense', 'Special Defense', 'Special Attack', 'Attack'],
            datasets: [{
                label: 'Skills',
                data: arr,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 0, 1)',
                borderWidth: 2,
            }]
        },
        options: {
            scale: {
                min: 0,
                max: 150,
                stepSize: 30,
            },
            scales: {
                r: {
                    grid: {
                        color: ['black', 'red', 'orange', 'yellow', 'green', 'skyblue', 'indigo']
                    },
                    pointLabels: {
                      color: 'white',
                      font: {
                        size: 12,
                        style: 'italic'
                      }
                    },
                    ticks: {
                      backdropColor: 'transparent',
                      color: 'transparent',
                    }
                }
            },
            plugins: {
                legend: {
                display: false
                }
            }
        }
    });
    return myRadarChart
}
let myRadarChart = drawRadar();
const endpoint = `${pokemonsUrl}/25`;
  fetch(endpoint)
  .then((res) => res.json())
  .then((data) => setDisplay(data))