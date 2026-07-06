const prompt = require("prompt-sync")();

//-------------BUSCAR POKEMON--------------//
async function buscarPokemon() {
    const nombre = prompt("Cual es el pokemon que quieres investigar: ").toLowerCase();

    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/" + nombre);
    if (!respuesta.ok) {
        console.log("No se pudo encontrar el pokemon que deseas. Codigo:", respuesta.status);
        return null;
    }

    const datos = await respuesta.json();
    // console.log(datos);
    return datos;
    
}


//-------------CREACION DE FICHA--------------//

async function mostrarFicha() {
    const datos = await buscarPokemon();

    if (!datos) {
        return;
    }

    const nombre = datos.name.toUpperCase();
    const id = datos.id;
    const alturaCm = datos.height * 10;
    const pesoKg = datos.weight / 10;
    const tipos = datos.types.map(tipo => tipo.type.name);
    const stats = datos.stats.map(stat => ({
    nombre: stat.stat.name,
    valor: stat.base_stat
    }));
    const habilidades = datos.abilities.map(habilidad => {
        if (habilidad.is_hidden) {
            return "Habilidad oculta";
        } else {
            return habilidad.ability.name;
        }
    });

    console.log("===POKEDEX===")
    console.log("nombre:", nombre);
    console.log("ID pokedex:", id);
    console.log("altura:", alturaCm , "Cm");
    console.log("Peso:", pesoKg, "Kg");
    console.log("Tipos:", tipos);
    console.log("Stats:", stats);
    console.log("Habilidades:", habilidades);

}

mostrarFicha();