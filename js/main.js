// Datos base
const turnos = [
  { id: 1, horario: "Lunes 18:00", cupo: 2 },
  { id: 2, horario: "Martes 9:00", cupo: 2 },
  { id: 3, horario: "Miercoles 16:30", cupo: 3 },
  { id: 4, horario: "Jueves 18:30", cupo: 1 },
  { id: 5, horario: "Viernes 20:00", cupo: 1 },
  { id: 6, horario: "Sabado 13:00", cupo: 2 }
];
const actividades = ["Clases de Karate", "Defensa Personal", "Ataque First", "Entrenamiento Fisico"];
let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
// Referencias
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const actividad = document.getElementById("actividad");
const turno = document.getElementById("turno");
const lista = document.getElementById("lista");
const msg = document.getElementById("msg");
// selects 
function cargarOpciones() {
  actividad.innerHTML = `<option value="">Seleccioná la actividad</option>`;
  actividades.forEach(a => {
    let op = document.createElement("option");
    op.textContent = a;
    actividad.appendChild(op);
  });
  turno.innerHTML = `<option value="">Seleccioná el horario</option>`;
  turnos.forEach(t => {
    let op = document.createElement("option");
    op.value = t.id;
    op.textContent = t.horario;
    turno.appendChild(op);
  });
}
// Guardar en storage
const guardar = () => localStorage.setItem("reservas", JSON.stringify(reservas));
// Mostrar mensaje visual
const mostrarMensaje = (texto, tipo="info") => {
  msg.innerHTML = `<div class="alert alert-${tipo} py-2">${texto}</div>`;
  setTimeout(() => msg.innerHTML = "", 2500);
};
// Renderizar reservas
const render = () => {
  lista.innerHTML = "";
  reservas.sort((a,b)=>a.apellido?.localeCompare(b.apellido || ""));
  reservas.forEach((r,i)=>{
    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center bg-dark text-light";
    li.innerHTML = `${r.nombre} ${r.apellido} - ${r.actividad} - ${r.turno}`;
    let btn = document.createElement("button");
    btn.textContent = "❌";
    btn.className = "btn btn-sm btn-danger";
    btn.onclick = () => { reservas.splice(i,1); guardar(); render(); };
    li.appendChild(btn);
    lista.appendChild(li);
  });
  guardar();
};
// Agregar nueva reserva
const agregar = e => {
  e.preventDefault();
  let n = nombre.value.trim(),
      a = apellido.value.trim(),
      act = actividad.value,
      t = turnos.find(x => x.id == turno.value);
  if(!n || !a || !act || !t)
    return mostrarMensaje("Completá todos los campos","warning");
  if(reservas.some(r => r.nombre===n && r.apellido===a && r.turno===t.horario))
    return mostrarMensaje("Ya tenés una reserva en ese día y horario","danger");
  const ocupados = reservas.reduce((acc, r) => acc + (r.turno === t.horario), 0);
  if (ocupados >= t.cupo)
    return mostrarMensaje("No hay cupos disponibles para ese turno", "danger");
  reservas.push({nombre:n, apellido:a, actividad:act, turno:t.horario});
  guardar(); render();
  nombre.value = apellido.value = ""; actividad.value = turno.value = "";
  mostrarMensaje("Reserva realizada correctamente","success");
};
// Eventos
document.getElementById("formReserva").addEventListener("submit", agregar);
document.getElementById("btnBorrar").addEventListener("click", ()=>{
  reservas=[]; localStorage.removeItem("reservas"); render();
  mostrarMensaje("Reservas eliminadas","secondary");
});
// Inicializar
cargarOpciones();
render();
