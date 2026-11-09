// Buscamos los elementos HTML que vamos a utilizar.
const formulario = document.getElementById("formulario-tarea");
const entradaTarea = document.getElementById("entrada-tarea");
const listaTareas = document.getElementById("lista-tareas");
const mensajeVacio = document.getElementById("mensaje-vacio");
const contadorTareas = document.getElementById("contador-tareas");

// Creamos un arreglo de objetos: cada objeto representa una tarea.
let tareas = [
    { id: 1, descripcion: "Revisar las actividades pendientes", completada: false },
    { id: 2, descripcion: "Organizar los apuntes de clase", completada: false },
    { id: 3, descripcion: "Preparar el material de estudio", completada: false },
    { id: 4, descripcion: "Entregar el trabajo de tecnología", completada: true },
    { id: 5, descripcion: "Leer el tema de JavaScript", completada: true }
];

// Esta constante permite asignar un identificador diferente a cada tarea nueva.
let siguienteId = 6;

// Escuchamos el envío del formulario, que ocurre al pulsar Enter o el botón.
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); // Evita que el formulario recargue la página.

    const descripcion = entradaTarea.value.trim(); // Lee el texto y quita espacios sobrantes.

    if (descripcion === "") {
        entradaTarea.focus(); // Si no hay texto, vuelve a poner el cursor en el campo.
        return; // Detiene la función para no crear una tarea vacía.
    }

    // Agregamos un nuevo objeto al arreglo de tareas.
    tareas.push({
        id: siguienteId, // Guarda un identificador único para esta tarea.
        descripcion: descripcion, // Guarda el texto escrito por el usuario.
        completada: false // Toda tarea nueva comienza pendiente.
    });

    siguienteId++; // Aumenta el identificador para la próxima tarea.
    entradaTarea.value = ""; // Limpia el campo de texto.
    renderTasks(); // Actualiza lo que se ve en la página.
    entradaTarea.focus(); // Deja el cursor listo para escribir otra tarea.
});

// Dibuja nuevamente la lista cada vez que los datos cambian.
function renderTasks() {
    listaTareas.innerHTML = ""; // Elimina las filas anteriores antes de volver a dibujar.

    // Ordena las tareas: primero pendientes y después completadas.
    tareas.sort((a, b) => Number(a.completada) - Number(b.completada));

    // Muestra u oculta el mensaje dependiendo de si hay tareas.
    mensajeVacio.hidden = tareas.length > 0;

    // Actualiza el contador con la cantidad de tareas.
    contadorTareas.textContent =
        tareas.length + (tareas.length === 1 ? " tarea" : " tareas");

    // Recorre el arreglo y crea los elementos HTML para cada tarea.
    tareas.forEach((tarea) => {
        const elemento = document.createElement("li"); // Crea una fila para la tarea.
        elemento.className = "tarea"; // Le asigna la clase que tiene los estilos.

        if (tarea.completada) {
            elemento.classList.add("completada"); // Agrega el estilo de tarea terminada.
        }

        const casilla = document.createElement("input"); // Crea la casilla de verificación.
        casilla.type = "checkbox"; // Indica que será una casilla.
        casilla.checked = tarea.completada; // Marca la casilla si la tarea está completada.
        casilla.setAttribute("aria-label", "Marcar tarea como completada");

        // Cuando se cambia la casilla, actualiza el estado de la tarea.
        casilla.addEventListener("change", () => {
            cambiarEstado(tarea.id);
        });

        const texto = document.createElement("span"); // Crea el espacio para el texto.
        texto.className = "texto-tarea"; // Asigna la clase del texto.
        texto.textContent = tarea.descripcion; // Coloca la descripción de forma segura.

        const botonEliminar = document.createElement("button"); // Crea el botón para borrar.
        botonEliminar.type = "button"; // Evita que se comporte como botón de formulario.
        botonEliminar.className = "boton-eliminar"; // Asigna los estilos del botón.
        botonEliminar.textContent = "▤"; // Muestra un símbolo parecido a una papelera.
        botonEliminar.setAttribute("aria-label", "Eliminar tarea: " + tarea.descripcion);

        // Al pulsar eliminar, se quita la tarea del arreglo.
        botonEliminar.addEventListener("click", () => {
            eliminarTarea(tarea.id);
        });

        elemento.append(casilla, texto, botonEliminar); // Añade los controles dentro de la fila.
        listaTareas.appendChild(elemento); // Añade la fila a la lista visible.
    });
}

// Cambia una tarea de pendiente a completada o al contrario.
function cambiarEstado(id) {
    const tareaEncontrada = tareas.find((tarea) => tarea.id === id); // Busca la tarea por su ID.

    if (tareaEncontrada) {
        tareaEncontrada.completada = !tareaEncontrada.completada; // Invierte su estado.
        renderTasks(); // Vuelve a dibujar y la coloca en el grupo correspondiente.
    }
}

// Elimina del arreglo la tarea que tenga el identificador recibido.
function eliminarTarea(id) {
    tareas = tareas.filter((tarea) => tarea.id !== id); // Conserva todas menos la elegida.
    renderTasks(); // Actualiza la lista después de eliminar.
}

// Ejecutamos esta función al abrir la página para mostrar las tareas iniciales.
renderTasks();
