const btnR = document.querySelector('.btn-right');
const btnL = document.querySelector('.btn-left');
const tracks = document.querySelector('.tracks');
const tracksW = tracks.scrollWidth;

btnR.addEventListener('click', _ => {
  tracks.scrollBy({
    left: tracksW / 2,
    behavior: 'smooth'
  });
});

btnL.addEventListener('click', _ => {
  tracks.scrollBy({
    left: -tracksW / 2,
    behavior: 'smooth'
  });
});


let observer = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting) {
    document.body.classList.add("reveal");
  } else {
    document.body.classList.remove("reveal");
  }
});
observer.observe(document.querySelector("#top-of-site-pixel-anchor"));

document.addEventListener('DOMContentLoaded', function () {
  const taskForm = document.getElementById('taskForm');
  const saveTaskBtn = document.getElementById('saveTaskBtn');
  const newFolderBtn = document.getElementById('newFolderBtn');
  const taskContainer = document.getElementById('taskContainer');

  const saveTask = () => {
    // Obtener valores del formulario
    const taskName = document.getElementById('taskName').value;
    const taskDate = document.getElementById('taskDate').value;
    const taskTimeStart = document.getElementById('taskTimeStart').value;
    const taskTimeEnd = document.getElementById('taskTimeEnd').value;
    const taskFolder = document.getElementById('taskFolder').value;
    const folderColor = document.getElementById('folderColor').value;
    

    // Crear nuevo elemento de tarea
    const newTask = document.createElement('div');
    newTask.classList.add('list-group-item');
    newTask.innerHTML = `<i class="fas fa-folder" style="color:${folderColor}"></i> <strong>${taskFolder}</strong>
      <ul class="list-group">
        <li class="list-group-item">${taskName} - ${taskDate} - ${taskTimeStart} a ${taskTimeEnd}</li>
      </ul>`;

    // Agregar la nueva tarea al contenedor
    taskContainer.appendChild(newTask);

    // Limpiar el formulario
    taskForm.reset();

    // Cerrar el modal
    $('#taskModal').modal('hide');
  };

  const createNewFolder = () => {
    // Obtener el nombre de la nueva carpeta
    const newFolderName = document.getElementById('newFolder').value;
    const newFolderColor = document.getElementById('folderColor').value;

    // Crear nuevo elemento de carpeta
    const newFolderOption = document.createElement('option');
    newFolderOption.value = newFolderName;
    newFolderOption.text = newFolderName;

    // Agregar la nueva carpeta a la lista desplegable
    const taskFolderSelect = document.getElementById('taskFolder');
    taskFolderSelect.appendChild(newFolderOption);

    // Limpiar el campo de nueva carpeta
    document.getElementById('newFolder').value = '';
    document.getElementById('folderColor').value = '#ffcc00'; // Establecer un color predeterminado

    // Seleccionar la nueva carpeta en la lista desplegable
    taskFolderSelect.value = newFolderName;

    // Cerrar el modal
    $('#taskModal').modal('hide');
  };

  saveTaskBtn.addEventListener('click', saveTask);
  newFolderBtn.addEventListener('click', createNewFolder);
});

// Obtiene la fecha actual
const currentDate = new Date();

// Obtiene el elemento donde se mostrará el mes actual
const currentMonthElement = document.getElementById("currentMonth");

// Obtiene el nombre del mes actual
const currentMonthName = new Intl.DateTimeFormat('es-MX', { month: 'long' }).format(currentDate);

// Obtiene el día de la semana actual
const currentDayOfWeek = currentDate.getDay();

// Obtiene el día del mes actual
const currentDayOfMonth = currentDate.getDate();

// Obtiene los días de la semana a partir del día actual
const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

// Muestra el mes y los días de la semana
currentMonthElement.textContent = `${currentMonthName.toUpperCase()} - ${daysOfWeek[currentDayOfWeek]} ${currentDayOfMonth}`;

// Obtiene todos los elementos con la clase "heading" en los tracks
const trackHeadings = document.querySelectorAll('.month .heading');

// Itera sobre los elementos y agrega el día del mes
trackHeadings.forEach((heading, index) => {
  const dayOfMonth = (currentDayOfMonth + index) % 31; // Mod 31 para evitar que el día del mes sea mayor a 31
  heading.textContent = `${daysOfWeek[(currentDayOfWeek + index) % 7]} ${dayOfMonth}`;
});