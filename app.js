const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const tasks = document.querySelector('.collection');
const clearTasks = document.querySelector('.clear-tasks');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
	// DOM Load event
	document.addEventListener('DOMContentLoaded', loadTasks);
	// Add task event
	form.addEventListener('submit', addTask);
	// Remove task event
	tasks.addEventListener('click', removeTask);
	// Clear task event
	clearTasks.addEventListener('click', clearAllTasks);
	// Filter task event
	filter.addEventListener('keyup', filterTasks);
}

// Load tasks from local storage
function loadTasks() {
	let tasksArray;
	// Check local storage for tasks
	if (localStorage.getItem('tasks' === null)) {
		tasksArray = [];
	} else {
		tasksArray = JSON.parse(localStorage.getItem('tasks'));
	}
	tasksArray.forEach(function(task) {
		// Create li element
		const li = document.createElement('li');
		li.className = 'collection-item';

		// Create link element
		const link = document.createElement('a');
		link.setAttribute('href', '#');
		link.className = 'delete-item secondary-content';

		// Create i element
		const i = document.createElement('i');
		i.className = 'fa fa-remove';

		// Append i element to link element
		link.appendChild(i);
		// Append the task input value to the li
		li.appendChild(document.createTextNode(task));
		// Append link to li
		li.appendChild(link);
		// Add new list item to the tasks list
		tasks.appendChild(li);
	});
}

function addTask(e) {
	if (taskInput.value === '') {
		alert('Add a task.');
	} else {
		// Create li element
		const li = document.createElement('li');
		li.className = 'collection-item';

		// Create link element
		const link = document.createElement('a');
		link.setAttribute('href', '#');
		link.className = 'delete-item secondary-content';

		// Create i element
		const i = document.createElement('i');
		i.className = 'fa fa-remove';

		// Append i element to link element
		link.appendChild(i);
		// Append the task input value to the li
		li.appendChild(document.createTextNode(taskInput.value));
		// Append link to li
		li.appendChild(link);

		// Add new list item to the tasks list
		tasks.appendChild(li);

		// Store tasks in local storage
		storeTasksInLocalStorage(taskInput.value);

		// Clear input
		taskInput.value = '';
	}

	e.preventDefault();
}

// Store tasks in local storage
function storeTasksInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
	// When the user clicks the x, the task disapears
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are you sure?')) {
			e.target.parentElement.parentElement.remove();

			//Remove task from local storage
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

//Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function(task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearAllTasks() {
	//tasks.innerHTML = ''; or
	// Faster
	while (tasks.firstChild) {
		tasks.removeChild(tasks.firstChild);
	}

	// Clear tasks from local storage
	clearTasksFromLocalStorage();
}

// Clear all tasks form local storage
function clearTasksFromLocalStorage() {
	let tasks = [];
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filter Tasks
function filterTasks(e) {
	// Get user filter text
	const text = e.target.value.toLowerCase();
	// Filter with user text
	document.querySelectorAll('.collection-item').forEach(function(task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}
