

const todoTitle = document.getElementById("todoTitle");
const todoDesc = document.getElementById("desc");
const submitButton = document.getElementById("submitbtn");
const mainListItem = document.getElementById("mainListItem");
const toastifyElement = document.getElementById("alert");
const toastify = (msg, options) => {
  toastifyElement.style.right = "0";
  switch (options.type) {
    case "warn":
      toastifyElement.style.backgroundColor = "tomato";

      break;
    case "error":
      toastifyElement.style.backgroundColor = "orange";

    default:
      toastifyElement.style.backgroundColor = "gainsbro";

      break;
  }
  toastifyElement.children[0].innerHTML = msg;
  toastifyElement.children[1].addEventListener("click", () => {
    toastifyElement.style.right = "-100%";
  });
  setTimeout(function () {
    toastifyElement.style.right = "-100%";
  }, options.time || 3000);
};

const savedLCTodos = localStorage.getItem("todoItem");
const parseSavedLCTodos = JSON.parse(savedLCTodos) || [];
let saveTodos = [...parseSavedLCTodos];
const creatNewTodo = (title, desc, id, checked) => {
  const listItem = document.createElement("li");
  listItem.className = "list";
  listItem.id = id;
  const titleListItem = document.createElement("h3");
  const todoTitleInput = document.createElement("input");
  titleListItem.appendChild(todoTitleInput);
  todoTitleInput.defaultValue = title;
  todoTitleInput.classList = "title-input";
  todoTitleInput.disabled = "true";
  titleListItem.style.backgroundColor = "orange";
  if (checked) {
    titleListItem.style.backgroundColor = "green";
  }
  const descListItem = document.createElement("p");
  descListItem.style.backgroundColor = "";
  descListItem.innerHTML = desc;
  const todoController = document.createElement("div");
  const delButton = document.createElement("button");
  delButton.className = "btn-2";
  delButton.innerHTML = "Del";
  const editButton = document.createElement("button");
  editButton.className = "btn-2";
  editButton.innerHTML = "Edite";
  const updateButton = document.createElement("button");
  updateButton.className = "btn-2";
  updateButton.innerHTML = "check";
  // append my Element in parent tag

  todoController.appendChild(delButton);
  todoController.appendChild(editButton);
  todoController.appendChild(updateButton);
  listItem.appendChild(titleListItem);
  listItem.appendChild(descListItem);
  listItem.appendChild(todoController);
  listItem.className="flex-1 justify-center align-middle flex-col"

  mainListItem.appendChild(listItem);
};

const handeCreatTodo = (event) => {
  event.preventDefault();
  if (!todoTitle.value)
    return toastify("please type somthing ...", {
      time: 2000,
      type: "error",
    });
  const newTodo = {
    title: todoTitle.value,
    desc: todoDesc.value,
    id: Date.now(),
    checked: false,
  };
  saveTodos.push(newTodo);
  localStorage.setItem("todoItem", JSON.stringify(saveTodos));
  creatNewTodo(newTodo.title, newTodo.desc, newTodo.id);
};

mainListItem.addEventListener("click", (e) => {
  if (e.target.innerText === "Del") {
    const todoEl = e.target.parentElement.parentElement;
    const filteredTodo = saveTodos.filter(
      (item) => item.id !== Number(todoEl.id)
    );
    localStorage.setItem("todoItem", JSON.stringify(filteredTodo));
    location.reload();
  } else if (e.target.innerText === "check") {
    const todoEl = e.target.parentElement.parentElement;
    const filteredTodo = saveTodos.filter(
      (item) => item.id === Number(todoEl.id)
    );
    const updateFilteredTodo = {
      ...filteredTodo[0],
      checked: true,
    };
    const filteredTodosUpdate = saveTodos.filter(
      (item) => item.id !== Number(todoEl.id)
    );
    const updateSavedTodos = [...filteredTodosUpdate, updateFilteredTodo];
    localStorage.setItem("todoItem", JSON.stringify(updateSavedTodos));
    location.reload();
  } else if (e.target.innerText === "Edite") {
    const todoEl = e.target.parentElement.parentElement;
    todoEl.children[0].children[0].disabled = false;
    todoEl.children[0].children[0].style.backgroundColor = "blue";
    todoEl.children[0].children[0].select();
    e.target.innerText = "save";
    e.target.addEventListener("click", () => {
      const filteredTodo = saveTodos.filter(
        (item) => item.id === Number(todoEl.id)
      );
      const updateFilteredTodo = {
        ...filteredTodo[0],
        title: todoEl.children[0].children[0].value,
      };

      const filteredTodosUpdate = saveTodos.filter(
        (item) => item.id !== Number(todoEl.id)
      );
      // console.log(filteredTodosUpdate);
      const updateSavedTodos = [...filteredTodosUpdate, updateFilteredTodo];
      // console.log(updateSavedTodos);
      localStorage.setItem("todoItem", JSON.stringify(updateSavedTodos));
      location.reload();
    });
  }
});
saveTodos.forEach((todo) => {
  creatNewTodo(todo.title, todo.desc, todo.id, todo.checked);
});
submitButton.addEventListener("click", handeCreatTodo);




