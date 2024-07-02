function setHoraActual() {
    const now = new Date();
    const fechaInput = document.getElementById('fecha');
    const horaInput = document.getElementById('hora');

    // Formato de fecha: YYYY-MM-DD
    const fecha = now.toISOString().split('T')[0];
    // Formato de hora: HH:MM
    const hora = now.toTimeString().split(' ')[0].slice(0, 5);

    fechaInput.value = fecha;
    horaInput.value = hora;
}

// Llama a la función cuando se carga la página
window.onload = setHoraActual;