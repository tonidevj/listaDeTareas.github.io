// selectores 
const inputWork = document.querySelector('#text');
const buttonAdd = document.querySelector('.buttonAdd');
const buttonDelete =  document.querySelector('.button1');
const buttonSave = document.querySelector('.button2');
const taskList = document.querySelector('#list');
const total = document.querySelector('.total')
const completas = document.querySelector('.completes')
const incompletes = document.querySelector('.incompletes')
let tareas = [];

// funcion agregar tarea
function renderTareas() {
    taskList.innerHTML = '';
    tareas.forEach(tarea => {
        const newTaskItem = document.createElement('li');
        newTaskItem.id = tarea.id;
        newTaskItem.innerHTML = `
            <button class="button1">X</button>
            <p>${tarea.input}</p>
            <button class="button2">✔</button>
        `;
        if (tarea.completada) {
            newTaskItem.classList.add('completed');
        }
        taskList.appendChild(newTaskItem);
    });
};

// contadores para saber el total de tareas
const contador = () => {
    const totalTareas = tareas.length; // Total de tareas
    console.log('Total de tareas:', totalTareas);
    total.innerHTML = `Total : ${totalTareas}`;
    
    const totalTareasCompletadas = tareas.filter(tarea => tarea.completada).length; //Tareas completadas
    console.log('Completadas:', totalTareasCompletadas);
    completas.innerHTML= `Completadas: ${totalTareasCompletadas}`;

    const totalIncompletas = tareas.filter(tarea => !tarea.completada).length; // Tareas incompletas
    console.log(tareas.filter(tarea => !tarea.completada));
    console.log('Total de tareas incompletas:', totalIncompletas);
    incompletes.innerHTML= `Incompletas: ${totalIncompletas}`
};

// evento para agregar tarea
buttonAdd.addEventListener('click', e => {
    const taskContent = inputWork.value.trim();
    if (taskContent !== '') {
        const tarea = {
            id: crypto.randomUUID(),
            input: taskContent,
            completada: false,
        };
        tareas.push(tarea); // Agregar la nueva tarea al array
        localStorage.setItem('tareas', JSON.stringify(tareas)); // Guardar el array de tareas en localStorage
        renderTareas(); // Renderizar las tareas actualizadas
        inputWork.value = ''; // Limpiar el campo de entrada después de agregar la tarea
    } contador();
});

// Evento para eliminar una tarea
taskList.addEventListener('click', e => {
    const deleteBtn = e.target.closest('.button1');
    if (deleteBtn) {
        const taskId = deleteBtn.parentElement.getAttribute('id');
        console.log("Task ID to delete:", taskId);
        tareas = tareas.filter(tarea => tarea.id !== taskId);
        console.log("Tareas after filtering:", tareas);
        localStorage.setItem('tareas', JSON.stringify(tareas));
        renderTareas();
        contador();
    }
    console.log(deleteBtn)
});

// evento para dar como hecha la tarea
taskList.addEventListener('click', e => {
    const checkBtn = e.target.closest('.button2');
    if (checkBtn) {
        const taskId = checkBtn.parentElement.getAttribute('id');
        const tarea = tareas.find(tarea => tarea.id === taskId);
        if (tarea) {
            tarea.completada = !tarea.completada;
            localStorage.setItem('tareas', JSON.stringify(tareas));
            renderTareas();
            contador();
        }
    }
});

// almacenamiento del navegador
const tareasDb = localStorage.getItem('tareas');
if (localStorage.getItem('tareas')) {
    tareas = JSON.parse(tareasDb);
    if(tareasDb) {
        tareas = JSON.parse(tareasDb);
    }
    renderTareas();
    contador();
}
contador();