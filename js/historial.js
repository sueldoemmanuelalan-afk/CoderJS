//historial
function refrescarHistorial() {
  const ul = document.getElementById('listaHistorial');
  ul.innerHTML = '';

  if (!reservas.length) {
    ul.innerHTML = `<li class="list-group-item text-center text-muted">No hay reservas</li>`;
    return;
  }

  reservas.forEach((r, i) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center bg-light';

    li.innerHTML = `
      <div>
        <strong>${r.nombre} ${r.apellido}</strong><br>
        <small>${r.actividad} — ${r.turno}</small><br>
        <small class="text-muted">${r.email}</small>
      </div>
    `;

    const botones = document.createElement('div');

    // botón editar
    const btnEdit = document.createElement('button');
    btnEdit.className = 'btn btn-sm btn-warning me-2';
    btnEdit.textContent = 'Editar';
    btnEdit.onclick = () => editarReserva(i);

    // botón eliminar
    const btnDel = document.createElement('button');
    btnDel.className = 'btn btn-sm btn-danger';
    btnDel.textContent = 'Eliminar';
    btnDel.onclick = () => eliminarReserva(i);

    botones.appendChild(btnEdit);
    botones.appendChild(btnDel);

    li.appendChild(botones);
    ul.appendChild(li);
  });
}

function eliminarReserva(i) {
  reservas.splice(i, 1);
  localStorage.setItem('reservas', JSON.stringify(reservas));
  Toastify({ text: 'Reserva eliminada', gravity: 'top', duration: 2000 }).showToast();
  refrescarHistorial();
}
// borrar todo el historial
function borrarTodoHistorial() {
  Swal.fire({
    title: '¿Borrar todo el historial?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Borrar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
  }).then((result) => {
    if (result.isConfirmed) {
      reservas = [];
      localStorage.setItem('reservas', JSON.stringify(reservas));
      refrescarHistorial();

      Toastify({
        text: 'Historial eliminado',
        gravity: 'top',
        duration: 2000,
        style: { background: 'linear-gradient(to right, #ff0000, #ff8800)' },
      }).showToast();
    }
  });
}
// botón borrar historial
const btnBorrarHistorial = document.getElementById('btnBorrarHistorial');
btnBorrarHistorial.addEventListener('click', borrarTodoHistorial);
