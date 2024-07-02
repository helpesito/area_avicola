function getData() {
    const url = '/api/higienizaciones';
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            let higienizaciones = datos;
            let tabla = document.querySelector('#tablaP tbody');
            // limpiar tabla
            tabla.innerHTML = '';

            // Recorrer los productos y agregarlos a la tabla
            higienizaciones.forEach(higienizacion => {
                let fila = document.createElement('tr');
                fila.innerHTML = `
                        <td class="oculto">${higienizacion.id_higienizacion}</td>
                        <td>${higienizacion.fecha}</td>
                        <td>${higienizacion.higienizacion}</td>
                        <td>${higienizacion.numero_lote}</td>
                        <td>${higienizacion.nombre_usuario + ' ' + higienizacion.apellido_usuario}</td>
                        <td>${higienizacion.residuos}</td>
                    `;
                    
                tabla.appendChild(fila);
            });
            // new DataTable('#tablaP')
        })
        .catch(error => console.error('Error:', error));
}

getData()

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

async function postData() {
    try {
    let formulario = document.getElementById('formulario')
    let dato = new FormData(formulario)

    const datosJson = {};
    
    for (let [key, value] of dato.entries()) {
        datosJson[key] = value ? value : 'no'; // Convertir campos vacíos a null
    }

    datosJson.id_usuario = parseInt(datosJson.id_usuario);
    datosJson.id_lote = parseInt(datosJson.id_lote);
    datosJson.residuos = parseInt(datosJson.residuos);

    //preparamos la ruta
    const url = '/api/higienizaciones';

    const confi = {
        method: 'POST',
        
        body: JSON.stringify(datosJson),
        
        headers: {
            'Content-Type': 'application/json'
        }
    }
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
