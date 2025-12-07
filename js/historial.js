// refrescar historial
function refrescarHistorial() {
  const ul = document.getElementById('listaHistorial');
  ul.innerHTML = '';

  if (!reservas.length) {
    ul.innerHTML = `<li class="list-group-item text-center bg-dark text-light">No hay reservas</li>`;
    return;
  }

  reservas.forEach((r, i) => {
    const li = document.createElement('li');
    li.className =
      'list-group-item d-flex justify-content-between align-items-center bg-dark text-light border-warning';

    li.innerHTML = `
      <div>
        <strong class="text-neon">${r.nombre} ${r.apellido}</strong><br>
        <small>${r.actividad} — ${r.turno}</small><br>
        <small class="text-neon">${r.email}</small>
      </div>
    `;

    const btns = document.createElement('div');

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

    btns.appendChild(btnEdit);
    btns.appendChild(btnDel);
    li.appendChild(btns);
    ul.appendChild(li);
  });
}

// eliminar reserva
function eliminarReserva(i) {
  Swal.fire({
    title: '¿Eliminar reserva?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
  }).then((r) => {
    if (r.isConfirmed) {
      reservas.splice(i, 1);
      localStorage.setItem('reservas', JSON.stringify(reservas));
      refrescarHistorial();

      Toastify({
        text: 'Reserva eliminada',
        gravity: 'top',
        className: 'toastify-error',
        duration: 2000,
      }).showToast();
    }
  });
}

// borrar todo historial
function crearBotonBorrarHistorial() {
  const c = document.getElementById('historial-buttons');
  const btn = document.createElement('button');
  btn.textContent = 'Borrar todo el historial';
  btn.className = 'btn btn-neon mt-3 w-25';
  btn.onclick = () => {
    Swal.fire({
      title: '¿Borrar historial?',
      text: 'No se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed) {
        reservas = [];
        localStorage.setItem('reservas', JSON.stringify(reservas));
        refrescarHistorial();
        Toastify({ text: 'Historial eliminado', className: 'toastify-success', gravity: 'top' }).showToast();
      }
    });
  };
  c.appendChild(btn);
}
crearBotonBorrarHistorial();
