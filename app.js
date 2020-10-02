const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const deleteAll = document.querySelector(".delete-all");
const search = document.querySelector(".search input");

const statusTasks = {
  completed: 0,
  undone: 0,
  total_tasks: 0,
};

const handleRemoveTask = () => {
  statusTasks.total_tasks--;

  handleCompletedRemove();
  handleStatusTask();
};
const handleStatusTask = () => {
  if (statusTasks.completed < 0) statusTasks.completed = 0;
  if (statusTasks.undone < 0) statusTasks.undone = 0;
  statusTasks.undone = statusTasks.total_tasks - statusTasks.completed;
  return statusTasks.undone;
};

const handleCompletedAdd = () => ++statusTasks.completed;

const handleCompletedRemove = () => --statusTasks.completed;

const initialUndone = (total_tasks) => {
  statusTasks.undone = total_tasks - statusTasks.completed;
  document.querySelector(".undone").innerHTML = statusTasks.undone;
};
//create to-do list
const generateTemplate = (todo) => {
  const html = `
   <li class="list-group-item">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
            <i  class="far fa-circle circle"></i>
            
    </li>
   `;

  list.innerHTML += html;
  statusTasks.total_tasks++;

  initialUndone(statusTasks.total_tasks);
  document.querySelector(".total-tasks").innerHTML = statusTasks.total_tasks;

  document.querySelectorAll(".circle").forEach(function (element) {
    element.addEventListener("click", function () {
      if (this.className === "far fa-circle circle") {
        this.className = "far fa-check-circle circle";
        element.parentNode.style.textDecoration = "line-through";
        element.style.color = "greenyellow";
        document.querySelector(".completed").innerHTML = handleCompletedAdd();
        document.querySelector(".undone").innerHTML = handleStatusTask();
      } else {
        this.className = "far fa-circle circle";
        element.parentNode.style.textDecoration = "none";
        element.style.color = "white";
        document.querySelector(
          ".completed"
        ).innerHTML = handleCompletedRemove();
        document.querySelector(".undone").innerHTML = handleStatusTask();
      }
    });
  });
};

//get value from input and add it to li template
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  generateTemplate(todo);
  addForm.add.value = "";
});

//delete to-do item
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    handleRemoveTask();
    document.querySelector(".total-tasks").innerHTML = statusTasks.total_tasks;
    document.querySelector(".completed").innerHTML = statusTasks.completed;
    document.querySelector(".undone").innerHTML = statusTasks.undone;
  }
});

//deleting all to-do's
deleteAll.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-all")) {
    list.innerHTML = "";
    statusTasks.completed = 0;
    statusTasks.undone = 0;
    statusTasks.total_tasks = 0;
    document.querySelector(
      ".total-tasks"
    ).innerHTML = statusTasks.total_tasks = 0;
    document.querySelector(".completed").innerHTML = statusTasks.completed = 0;
    document.querySelector(".undone").innerHTML = statusTasks.undone = 0;
  }
});

//filter todo's
const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

//keyup event
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
