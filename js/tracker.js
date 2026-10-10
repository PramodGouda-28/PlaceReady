const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("placeready_tasks") || "[]");

function saveTasks() {
  localStorage.setItem("placeready_tasks", JSON.stringify(tasks));
}

function showTasks() {
  taskList.replaceChildren();

  tasks.forEach((task, index) => {
    const item = document.createElement("li");
    const checkbox = document.createElement("input");
    const text = document.createElement("span");
    const remove = document.createElement("button");

    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      tasks[index].done = checkbox.checked;
      saveTasks();
      showTasks();
    });

    text.textContent = task.name;
    if (task.done) text.style.textDecoration = "line-through";

    remove.textContent = "Delete";
    remove.type = "button";
    remove.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      showTasks();
    });

    item.append(checkbox, text, remove);
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.gap = "12px";
    item.style.margin = "12px 0";
    taskList.appendChild(item);
  });

  const completed = tasks.filter(task => task.done).length;
  const percent = tasks.length
    ? Math.round(completed / tasks.length * 100)
    : 0;

  document.getElementById("taskCount").textContent =
    `${completed} tasks completed out of ${tasks.length}`;

  document.getElementById("progressBar").value = percent;
  document.getElementById("progressText").textContent =
    `${percent}% completed`;

  document.getElementById("emptyMessage").hidden = tasks.length > 0;
}

taskForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = taskInput.value.trim();
  if (!name) return;

  tasks.push({ name, done: false });
  saveTasks();
  showTasks();
  taskInput.value = "";
  taskInput.focus();
});

document.getElementById("clearTasks").addEventListener("click", () => {
  if (tasks.length === 0) return;

  if (confirm("Delete all preparation tasks?")) {
    tasks = [];
    saveTasks();
    showTasks();
  }
});

showTasks();