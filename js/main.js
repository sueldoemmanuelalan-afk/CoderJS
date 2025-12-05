// variables globales
let horarios = [];
let actividades = [];
let cupoPorTurno = 3;
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

// inputs
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const emailInput = document.getElementById('email');
const actividadInput = document.getElementById('actividad');
const fechaInput = document.getElementById('fecha');
const selectHorarioInput = document.getElementById('selectHorario');

// precargar form
function precargarForm() {
  document.getElementById('nombre').value = 'Johnny';
  document.getElementById('apellido').value = 'Lawrence';
  document.getElementById('email').value = 'J.Lawrence@example.com';
}

// cargar datos desde db.json
fetch('db/db.json')
  .then((r) => r.json())
  .then((db) => {
    horarios = db.horarios;
    actividades = db.actividades;
    cupoPorTurno = db.cupoPorTurno;
    llenarActividades();
    cargarPlaceholderHorario();
    precargarForm();
    refrescarHistorial();
  });

// actividades en el select
function llenarActividades() {
  const sel = document.getElementById('actividad');
  sel.innerHTML = `<option value="" disabled selected>Seleccioná actividad</option>`;
  actividades.forEach((a) => {
    sel.innerHTML += `<option value="${a}">${a}</option>`;
  });
}

// placeholder horario
function cargarPlaceholderHorario() {
  const sel = document.getElementById('selectHorario');
  sel.innerHTML = `<option disabled selected>Elegí primero un día…</option>`;
  sel.disabled = true;
}

// horarios según día
document.getElementById('fecha').addEventListener('change', (e) => {
  const fecha = e.target.value;
  cargarHorariosSegunFecha(fecha);
});

function cargarHorariosSegunFecha(fecha) {
  const sel = document.getElementById('selectHorario');
  sel.innerHTML = `<option disabled selected>Seleccioná horario</option>`;
  sel.disabled = false;

  let disponible = false;

  horarios.forEach((hora) => {
    const clave = `${fecha} ${hora}`;
    const ocupados = reservas.filter((r) => r.turno === clave).length;

    if (ocupados < cupoPorTurno) {
      sel.innerHTML += `<option value="${hora}">${hora}</option>`;
      disponible = true;
    }
  });

  if (!disponible) {
    sel.innerHTML = `<option disabled>No hay horarios disponibles</option>`;
    sel.disabled = true;
  }
}

// reservar
document.getElementById('formReserva').addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = nombreInput.value.trim();
  const apellido = apellidoInput.value.trim();
  const email = emailInput.value.trim();
  const actividad = actividadInput.value;
  const fecha = fechaInput.value;
  const hora = selectHorarioInput.value;

  if (!nombre || !apellido || !email || !actividad || !fecha || !hora) {
    return Toastify({ text: 'Completá todos los campos', gravity: 'top', duration: 2000 }).showToast();
  }

  const clave = `${fecha} ${hora}`;

  // duplicado
  if (reservas.some((r) => r.nombre === nombre && r.apellido === apellido && r.turno === clave)) {
    return Swal.fire('Error', 'Ya tienes una reserva en ese horario', 'warning');
  }

  // cupos
  if (reservas.filter((r) => r.turno === clave).length >= cupoPorTurno) {
    return Swal.fire('Cupo completo', 'Ese horario ya no tiene lugares disponibles', 'error');
  }

  reservas.push({ id: Date.now(), nombre, apellido, email, actividad, turno: clave });
  localStorage.setItem('reservas', JSON.stringify(reservas));

  Swal.fire('Reserva confirmada', `${actividad}<br>${clave}`, 'success');

  e.target.reset();
  cargarPlaceholderHorario();
  refrescarHistorial();
});
// editar reserva
function editarReserva(index) {
  const r = reservas[index];

  // cargar datos al form
  document.getElementById('nombre').value = r.nombre;
  document.getElementById('apellido').value = r.apellido;
  document.getElementById('email').value = r.email;
  document.getElementById('actividad').value = r.actividad;

  // separar fecha y hora
  const [fecha, hora] = r.turno.split(' ');

  document.getElementById('fecha').value = fecha;

  // cargar horarios del día
  cargarHorariosSegunFecha(fecha);

  // seleccionar el horario previo
  const sel = document.getElementById('selectHorario');
  sel.value = hora;

  // eliminar reserva vieja para re-guardar
  reservas.splice(index, 1);
  localStorage.setItem('reservas', JSON.stringify(reservas));
  refrescarHistorial();

  Toastify({
    text: 'Editando reserva... modificá y guardá',
    gravity: 'top',
    duration: 2500,
  }).showToast();
}
