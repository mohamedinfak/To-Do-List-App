// Get references to DOM elements
const inputBox = document.getElementById("input-box");
const taskList = document.getElementById("list-container");

// Array to store tasks
let tasks = [];

// Function to add a new task
function addTask() {
  const taskText = inputBox.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Add task to the tasks array
  const task = {
    text: taskText,
    completed: false, // Default task state is incomplete
  };
  tasks.push(task);

  // Clear the input box
  inputBox.value = "";

  // Save and update the UI
  saveData();
  renderTasks();
}

// Function to render tasks in the UI
function renderTasks() {
  // Clear the task list in the DOM
  taskList.innerHTML = "";

  // Loop through tasks and add them to the DOM
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    // Create message container for task status
    const message = document.createElement("p");
    message.classList.add("task-status");

    // Mark as completed if the task is complete
    if (task.completed) {
      li.classList.add("checked");
      message.textContent = "Task is completed!";
    } else {
      message.textContent = "Task is pending!";
    }

    // Add click event to toggle completion state
    li.addEventListener("click", () => toggleComplete(index));

    // Create a delete button
    const span = document.createElement("span");
    span.innerHTML = "\u00d7"; // '×' symbol
    span.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering the task toggle
      deleteTask(index);
    });

    // Add keydown event listener for the delete key when the task is focused
    li.addEventListener("keydown", (e) => {
      if (e.key === "Delete") {
        e.preventDefault(); 
        deleteTask(index); 
      }
    });

    // Append the delete button
    li.appendChild(span);

    // Append the task status message
    li.appendChild(message);

    // Make the task focusable so it can listen for the "Delete" key press
    li.tabIndex = 0; // Makes the li element focusable

    taskList.appendChild(li);
  });
}

// Function to toggle the completion state of a task
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveData();
  renderTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1); // Remove the task from the array
  saveData();
  renderTasks();
}

// Function to save tasks to localStorage
function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadData() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  renderTasks();
}

// Load tasks on page load
loadData();

// Add event listener to trigger addTask() on pressing "Enter"
inputBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});
