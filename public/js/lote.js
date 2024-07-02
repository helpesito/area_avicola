function getData() {
    const url = '/api/lote';
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            let lotes = datos;
            let tabla = document.querySelector('#tablaP tbody');
            // limpiar tabla
            tabla.innerHTML = '';

            // Recorrer los productos y agregarlos a la tabla
            lotes.forEach(lote => {
                let fila = document.createElement('tr');
                fila.innerHTML = `
                        <td class="oculto">${lote.id_lote}</td>
                        <td>${lote.numero_lote}</td>
                        <td>${lote.ave}</td>
                        <td>${lote.fecha_ingreso}</td>
                        <td>${lote.cantidad_aves}</td>
                        <td>${lote.edad}</td>
                    `;
                tabla.appendChild(fila);
            });
            // new DataTable('#tablaP')
        })
        .catch(error => console.error('Error:', error));
}

getData()