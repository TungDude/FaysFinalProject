
async function onclickLeft() {
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    let response = await getPokemonData(pokemonName);
    let pokeImg = document.getElementById("pokemonSprite");
    pokeImg.src = response.img;
    pokeImg.style.display = "block";
}

async function onclickRight() {
    const pokemonName = document.getElementById("pokemonName2").value.toLowerCase();
    let response = await getPokemonData(pokemonName);
    let pokeImg = document.getElementById("pokemonSprite2");
    pokeImg.src = response.img;
    pokeImg.style.display = "block";
}
async function getPokemonData(name){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`); // pokemon name
        
        if(!response.ok){
            throw new Error("Could not find the Pokemon");
        }
        const pokemonData = await response.json();
        
        let pokeDex = pokemonData.order;

        // let pokemonStats = pokemonData.stats;
        const statHp = pokemonData.stats[0].base_stat
        const statAtk = pokemonData.stats[1].base_stat
        const statDef = pokemonData.stats[2].base_stat
        const statSpeAtk = pokemonData.stats[3].base_stat
        const statSpeDef = pokemonData.stats[4].base_stat
        const statSpeed = pokemonData.stats[5].base_stat
        return {
            img: pokemonData.sprites.front_default,
            hp: statHp,
            atk: statAtk,
            def: statDef,
            speAtk: statSpeAtk,
            speDef: statSpeDef,
            speed: statSpeed
        };
        //console.log(pokemonData.stats[0].base_stat)
        //console.log(hp)
        
    }
    catch(error){
        console.log(error);
    }
}

async function createChart () {
    try {
        const { hp, atk, def, speAtk, speDef, speed } = await getPokemonData();

        let ctx = document.getElementById('myChart').getContext('2d');
        let chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Hp','Atk','Def','Special Atk', 'Special Def', 'Speed'],
                datasets: [{
                    label: pokemonName1, // Note: Define pokemonName1 somewhere in your code
                    data: [hp, atk, def, speAtk, speDef, speed],
                    backgroundColor: 'blue',
                    borderWidth: 1
                }]
            },
            options: {
                tooltips: {
                    mode: 'index'
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}
// call chart data
createChart();