
async function traerVacunas() {
    try {
        const response = await fetch('/api/vacunas');
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        const vacunas = await response.json();
        const vacunaSelect = document.getElementById('vacuna');
        
        vacunas.forEach(vacuna => {
            const option = document.createElement('option');
            option.value = vacuna.id_vacuna;
            option.textContent = vacuna.vacuna;
            vacunaSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al obtener los tipos de vacunas:', error);
    }
}

traerVacunas()


async function traerNroLote() {
    try {
        const response = await fetch('/api/lotes');
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        const lotes = await response.json();
        const loteSelect = document.getElementById('lote');
        
        lotes.forEach(lote => {
            const option = document.createElement('option');
            option.value = lote.id_lotes;
            option.textContent = lote.nro_lote;
            loteSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al obtener el numero de lotes:', error);
    }
}

traerNroLote()

async function traerUsuario() {
    try {
        const response = await fetch('/api/usuario');
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        const usuarios = await response.json();
        const usuarioSelect = document.getElementById('usuario');
        
        usuarios.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario.id_usuario;
            option.textContent = usuario.nombres + ' ' + usuario.apellidos;
            usuarioSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
}

traerUsuario()

function getData() {
    const url = '/api/actividades';
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            let actividades = datos;
            let tabla = document.querySelector('#tablaP tbody');
            // limpiar tabla
            tabla.innerHTML = '';

            // Recorrer los productos y agregarlos a la tabla
            actividades.forEach(actividad => {
                let fila = document.createElement('tr');
                fila.innerHTML = `
                        <td class="oculto">${actividad.id_actividad}</td>
                        <td>${actividad.fecha}</td>
                        <td>${actividad.hora}</td>
                        <td>${actividad.numero_lote}</td>
                        <td>${actividad.nombre_usuario + ' ' + actividad.apellido_usuario}</td>
                        <td>${actividad.agua}</td>
                        <td>${actividad.huevos}</td>
                        <td>${actividad.alimento}</td>
                        <td>${actividad.vacuna}</td>
                    `;
                tabla.appendChild(fila);
            });
            // new DataTable('#tablaP')
        })
        .catch(error => console.error('Error:', error));
}

getData()




async function postData() {
    try {
    let formulario = document.getElementById('formulario')
    let dato = new FormData(formulario)
    console.log(dato)

    const datosJson = {};
    
    for (let [key, value] of dato.entries()) {
        datosJson[key] = value ? value : 'no'; // Convertir campos vacíos a null
    }

    datosJson.agua = parseInt(datosJson.agua);
    datosJson.huevos = parseInt(datosJson.huevos);
    datosJson.alimento = parseInt(datosJson.alimento);
    datosJson.id_usuario = parseInt(datosJson.id_usuario);
    datosJson.id_lote = parseInt(datosJson.id_lote);
    datosJson.id_vacuna = parseInt(datosJson.id_vacuna);


    //preparamos la ruta
    const url = '/api/actividades';

    const confi = {
        method: 'POST',
        
        body: JSON.stringify(datosJson),
        
        headers: {
            'Content-Type': 'application/json'
        }
    }

    console.log(datosJson)
    // Realizar la solicitud POST
    const request = await fetch(url, confi);

    // Verificar si la solicitud fue exitosa
    if (!request.ok) {
        throw new Error('Error en la solicitud: ' + request.statusText);
    }

    // Parsear la respuesta JSON
    const data = await request.json();
    console.log(data)
    console.log('Respuesta del servidor:', data);

    // Manejar la respuesta del servidor (por ejemplo, mostrar un mensaje de éxito)
    alert('Datos enviados correctamente');
    getData()
    } catch (error) {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error('Error al enviar los datos:', error);
        alert('Error al enviar los datos');
    }

}
