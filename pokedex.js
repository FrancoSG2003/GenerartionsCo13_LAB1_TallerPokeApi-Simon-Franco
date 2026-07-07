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

//mostrarFicha();

function obtenerStats(datos, nombreStat) {
    for (const stat of datos.stats) {
        if (stat.stat.name === nombreStat) {
            return stat.base_stat;
        }
    }
    return null;
}

async function compararPokemons(nombre1, nombre2, stat) {

    const datos1 = await buscarPokemon(nombre1);
    const datos2 = await buscarPokemon(nombre2);
    
    const nombreStat = prompt("¿Qué stat quieres comparar? ").toLowerCase();

    if ( datos1 === null || datos2 === null) {
        console.log("Alguno de los pokemon no existen")
        return;
    }

    const valor1 = obtenerStats(datos1, nombreStat);
    const valor2 = obtenerStats(datos2, nombreStat);

    if (valor1 === null || valor2 === null) {
        console.log("stat inexistente");
        console.log("Stats validas: hp, attack, defense, special-atack, special-defense, speed");
        return;
    }

    console.log(datos1.name.toUpperCase() + " tiene " + nombreStat + ": " +  valor1);
    console.log(datos2.name.toUpperCase() + " tiene " + nombreStat + ": " +  valor2);

    if (valor1 > valor2) {

        console.log("Gana " + datos1.name.toUpperCase());

    } else if (valor2 > valor1) {

        console.log("Gana " + datos2.name.toUpperCase());

    } else {
        console.log("empate en: " + nombreStat);
    }
}

compararPokemons();