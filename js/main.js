// Turnero
const turnosDisponibles = ["Lunes 18:00", "Martes 09:00", "Jueves 18:30", "Viernes 20:00", "Sabado 13:00"];
let reservas = [];

// Función de entrada: pedir nombre y turno
const reservarTurno = (nombre, indiceTurno) => {
  if (indiceTurno >= 0 && indiceTurno < turnosDisponibles.length) {
    const turnoSeleccionado = turnosDisponibles[indiceTurno];
    reservas.push({ nombre, turno: turnoSeleccionado });
    alert(`Turno reservado con éxito para: ${nombre}\nHorario: ${turnoSeleccionado}`);
  } else {
    alert("Opción inválida. Intenta nuevamente.");
  }
};

// Función de procesamiento: mostrar los turnos disponibles
const mostrarTurnos = (arrayTurnos) => {
  let mensaje = "Turnos disponibles:\n\n";
  for (let i = 0; i < arrayTurnos.length; i++) {
    mensaje += `${i + 1}. ${arrayTurnos[i]}\n`;
  }
  alert(mensaje);
};

// Función de salida: mostrar todas las reservas realizadas
const verReservas = (listaReservas) => {
  if (listaReservas.length === 0) {
    alert("Aún no hay reservas registradas.");
  } else {
    let mensaje = "Reservas actuales:\n\n";
    for (let i = 0; i < listaReservas.length; i++) {
      mensaje += `${i + 1}. ${listaReservas[i].nombre} - ${listaReservas[i].turno}\n`;
    }
    alert(mensaje);
  }
};

// Menu (bucle + condicional)
let continuar = true;

alert("Bienvenido al Turnero");

while (continuar) {
  const opcion = prompt(
    "Selecciona una opción:\n\n" +
    "1 Ver turnos disponibles\n" +
    "2 Reservar un turno\n" +
    "3 Ver reservas realizadas\n" +
    "4 Salir"
  );

  switch (opcion) {
    case "1":
      mostrarTurnos(turnosDisponibles);
      break;
    case "2":
      const nombre = prompt("Ingresa tu nombre:");
      mostrarTurnos(turnosDisponibles);
      const turnoElegido = parseInt(prompt("Elige el número del turno que deseas:")) - 1;
      reservarTurno(nombre, turnoElegido);
      break;
    case "3":
      verReservas(reservas);
      break;
    case "4":
      continuar = false;
      alert("¡Gracias por usar el turnero! Hasta luego.");
      break;
    default:
      alert("Opción no válida. Intenta de nuevo.");
  }
}

console.log("Reservas finales:", reservas);

