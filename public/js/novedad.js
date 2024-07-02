function getData(){
    const url =  '/api/novedad'
    fetch(url)
        .then(respuesta => respuesta.json())
            .then(datos =>{
                const novedades = datos;
                let tabla = document.querySelector('#tablaP tbody');
                tabla.innerHTML = '';
                console.log(novedades)

                novedades.forEach(novedad => {
                    let fila = document.createElement('tr')
                    fila.innerHTML = `
                        <td class="oculto">${novedad.id_novedad}</td>
                        <td>${novedad.nombre_usuario + ' ' + novedad.apellido_usuario}</td>
                        <td>${novedad.numero_lote}</td>
                        <td>${novedad.tipo_novedad}</td>
                        <td>${novedad.observacion}</td>
                        <td>${novedad.cantidad}</td>
                    `;
                    tabla.appendChild(fila);
                });

                
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

async function traerNovedad(){
    try{
        const response = await fetch('/api/tipoNovedad');
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        const tipoNovedad = await response.json();
        const tipoNovedadSelected = document.getElementById('novedad')

        tipoNovedad.forEach(novedad =>{
            const option = document.createElement('option');
            option.value = novedad.id_tipo_novedad;
            option.textContent = novedad.tipo_novedad;
            tipoNovedadSelected.appendChild(option)
        })

    }catch (error){
        console.error('Error al obtener usuarios:', error);
    }
}


traerNovedad()

const btnEnviar = document.getElementById('btnEnviar')
btnEnviar.addEventListener('click', postData)

async function postData(){
    try{
        let formulario = document.getElementById('formulario')
        let dato = new FormData(formulario)
        console.log(dato)
        const datosJson = {};

        for (let entrada of dato.entries()) {
            datosJson[entrada[0]] = entrada[1]
        }

        datosJson.tipo_novedad = parseInt(datosJson.tipo_novedad);
        datosJson.id_usuario = parseInt(datosJson.id_usuario);
        datosJson.id_lote = parseInt(datosJson.id_lote);
        datosJson.cantidad = parseInt(datosJson.cantidad);

        const url = '/api/novedad';
        
        const confi = {
            method: 'POST',

            body: JSON.stringify(datosJson),

            headers: {
                'Content-Type': 'application/json'
            }
        }

        console.log(datosJson)

        const request = await fetch(url, confi);

        if (!request.ok) {
            throw new Error('Error en la solicitud: ' + request.statusText);
        }

        const data = await request.json();
        console.log(data)
        console.log('Respuesta del servidor:', data);

        alert('Datos enviados correctamente');
        getData()

    }catch (error) {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error('Error al enviar los datos:', error);
        alert('Error al enviar los datos');
    }
}