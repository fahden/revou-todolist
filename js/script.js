document.addEventListener("DOMContentLoaded", () => {
  loadTasks();

  document.getElementById("addBtn").addEventListener("click", addTask);
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dateInput");

  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;

  // ✅ VALIDASI
  if (taskText === "" || taskDate === "") {
    alert("Task dan tanggal wajib diisi!");
    return;
  }

  const task = {
    text: taskText,
    date: taskDate,
    completed: false
  };

  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);

  taskInput.value = "";
  dateInput.value = "";

  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = getTasks();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const textContainer = document.createElement("div");
    textContainer.className = "task-text";

    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;

    const dateSpan = document.createElement("span");
    dateSpan.className = "task-date";
    dateSpan.textContent = ` (${task.date})`;

    textContainer.appendChild(textSpan);
    textContainer.appendChild(dateSpan);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteTask(index);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(textContainer);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

function editTask(index) {
  const tasks = getTasks();
  const newText = prompt("Edit task:", tasks[index].text);
  const newDate = prompt("Edit date (YYYY-MM-DD):", tasks[index].date);

  if (newText && newDate) {
    tasks[index].text = newText.trim();
    tasks[index].date = newDate;
    saveTasks(tasks);
    renderTasks();
  }
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  renderTasks();
}
