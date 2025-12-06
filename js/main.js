// variables
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

// precarga
function precargarForm() {
  nombreInput.value = 'Johnny';
  apellidoInput.value = 'Lawrence';
  emailInput.value = 'J.Lawrence@example.com';
}

// cargar JSON
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

// actividades
function llenarActividades() {
  actividadInput.innerHTML = `<option value="" disabled selected>Seleccioná actividad</option>`;
  actividades.forEach((a) => {
    actividadInput.innerHTML += `<option value="${a}">${a}</option>`;
  });
}

// placeholder horario
function cargarPlaceholderHorario() {
  selectHorarioInput.innerHTML = `<option disabled selected>Elegí primero un día…</option>`;
  selectHorarioInput.disabled = true;
}

// cargar horarios por día
fechaInput.addEventListener('change', (e) => {
  cargarHorariosSegunFecha(e.target.value);
});

function cargarHorariosSegunFecha(fecha) {
  selectHorarioInput.innerHTML = `<option disabled selected>Seleccioná horario</option>`;
  selectHorarioInput.disabled = false;

  let disponible = false;

  horarios.forEach((hora) => {
    const key = `${fecha} ${hora}`;
    const ocupados = reservas.filter((r) => r.turno === key).length;

    if (ocupados < cupoPorTurno) {
      selectHorarioInput.innerHTML += `<option value="${hora}">${hora}</option>`;
      disponible = true;
    }
  });

  if (!disponible) {
    selectHorarioInput.innerHTML = `<option disabled>No hay horarios disponibles</option>`;
    selectHorarioInput.disabled = true;
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
    return Toastify({
      text: 'Completá todos los campos',
      gravity: 'top',
      duration: 2000,
      className: 'toastify-error',
    }).showToast();
  }

  const turno = `${fecha} ${hora}`;

  // verificar duplicado
  if (reservas.some((r) => r.nombre === nombre && r.apellido === apellido && r.turno === turno)) {
    return Swal.fire({
      title: 'Error',
      text: 'Ya tenés una reserva en ese horario',
      icon: 'warning',
    });
  }

  // verificar cupos
  if (reservas.filter((r) => r.turno === turno).length >= cupoPorTurno) {
    return Swal.fire({
      title: 'Cupo completo',
      text: 'Ese horario ya no tiene lugares disponibles',
      icon: 'error',
    });
  }

  // guardar
  reservas.push({
    id: Date.now(),
    nombre,
    apellido,
    email,
    actividad,
    turno,
  });

  localStorage.setItem('reservas', JSON.stringify(reservas));

  Toastify({
    text: 'Reserva Confirmada',
    gravity: 'top',
    className: 'toastify-success',
    duration: 2000,
    offset: { x: 20, y: 80 },
  }).showToast();

  e.target.reset();
  cargarPlaceholderHorario();
  refrescarHistorial();
});

// editar reserva
function editarReserva(index) {
  const r = reservas[index];

  // cargar form
  nombreInput.value = r.nombre;
  apellidoInput.value = r.apellido;
  emailInput.value = r.email;
  actividadInput.value = r.actividad;

  const [fecha, hora] = r.turno.split(' ');

  fechaInput.value = fecha;
  cargarHorariosSegunFecha(fecha);
  selectHorarioInput.value = hora;

  // eliminar la reserva original
  reservas.splice(index, 1);
  localStorage.setItem('reservas', JSON.stringify(reservas));
  refrescarHistorial();

  Toastify({
    text: 'Editando reserva... modificá y guardá',
    gravity: 'top',
    duration: 2500,
    className: 'toastify-success',
  }).showToast();
}
