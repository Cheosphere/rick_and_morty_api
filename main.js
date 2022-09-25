let pagina = 1
const btnAnterior = document.getElementById('btnAnterior')
const btnSiguiente = document.getElementById('btnSiguiente')
const numeroPaginas = document.getElementById('numeroPaginas')

// Función para cargar API
const cargarApi = async () => {
    // Hacemos petición a la API con fetch
    try {
        const URL = `https://rickandmortyapi.com/api/character?page=${pagina}`
        const respuesta = await fetch(URL)
        console.log(respuesta)
        // Validamos estado de la respuesta
        if (respuesta.status === 200) {
            const datos = await respuesta.json() // Formateamos datos en json
            // console.log(datos)
            const container = document.getElementById('content')
            numeroPaginas.innerHTML = `
                    Página <span class="numero_pagina_span">${pagina}</span>
                    de <span class="numero_pagina_span">${datos.info.pages}</span>
                `
            let personajes = ''

            datos.results.forEach(personaje => {
                personajes += `
                <section class="card">
                    <div class="card_name">
                        <h3 class="card_name_title">${personaje.name}</h3>
                    </div>
                    <div class="card_image">
                        <img src="${personaje.image}" alt="${personaje.name}">
                    </div>
                    <div class="card_description">
                        <p>Status : <span>${personaje.status}</span></p>
                        <p>Species : <span>${personaje.species}</span></p>
                        <p>Gender : <span>${personaje.gender}</span></p>
                    </div>
                </section>
                `
            });

            container.innerHTML = personajes
            container.appendChild(container)
        // Capturamos algún error en la respuesta
        } else if (respuesta.status === 404) {
            console.log('Contenido no encontrado')
        } else {
            console.log('Error no identificado')
        }
    // Capturamos error si algo falló en la petición
    } catch (error) {
        console.log(error)
    }
}

// Función para regresar a página anterior
btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1
        numeroPaginas.innerHTML = pagina
        cargarApi()
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
})

// Función para avanzar a página siguiente
btnSiguiente.addEventListener('click', () => {
    if (pagina < 42) {
        pagina += 1
        numeroPaginas.innerHTML = pagina
        cargarApi()
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
})

// Ejecutamos o invocamos la función que carga la API
cargarApi()