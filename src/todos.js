import { currentArray, deleteEmptyProjects } from "./index.js";

function todo(title = "", description = "", dueDate = "", priority = "Low") {
    return { title, description, dueDate, priority };
}

export function createDOMTodos(currentTodo, project, currentArrayDOM) {
    
    const todoBlock = document.createElement("div");
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const dueDate = document.createElement("h3");
    const xRemoveTodo = document.createElement("button");
    const completedTodo = document.createElement("input");
    completedTodo.type = "checkbox";

    title.textContent = currentTodo.title;
    description.textContent = currentTodo.description;
    dueDate.textContent = currentTodo.dueDate;
    xRemoveTodo.textContent = "X";
    xRemoveTodo.classList.add("removeToDoButton");

    todoBlock.classList.add(`priority-${currentTodo.priority}`, "todoBlock");

    const textBlock = document.createElement("div");
    textBlock.classList.add("todoTextBlock");
    textBlock.append(title, description);

    const rightSideBlock = document.createElement("div");
    rightSideBlock.classList.add("todoRightSideBlock");
    rightSideBlock.append(xRemoveTodo, dueDate);

    todoBlock.append(completedTodo, textBlock ,rightSideBlock);

    xRemoveTodo.addEventListener("click", () => {
        removeTodo(project, currentTodo);
    });

    currentArrayDOM.appendChild(todoBlock);
}

function removeTodo(project, currentTodo) {
    const blockIndex = currentArray[project].findIndex(todo =>
        todo.title === currentTodo.title &&
        todo.description === currentTodo.description &&
        todo.dueDate === currentTodo.dueDate &&
        todo.priority === currentTodo.priority
      );
      
      if (blockIndex !== -1) {
        currentArray[project].splice(blockIndex, 1);
        console.log("snapshot", JSON.stringify(currentArray, null, 2));
        console.log(localStorage.getItem("lSCurrentArray"));
      }

    updateToDoArrays(project);
}

export function createToDo(project, todoName, todoDesc, todoDueDate, todoPriority) {
    currentArray[project].push(todo(todoName,
                                    todoDesc,
                                    todoDueDate,
                                    todoPriority ));
    updateToDoArrays(project);
}

function updateToDoArrays(project) {
    const currentArrayDOM = document.querySelector(`#${project}`);
    currentArrayDOM.textContent = "";

    const projectTitle = document.createElement("h1");
    projectTitle.textContent = project;

    currentArrayDOM.appendChild(projectTitle);
    
    if (currentArray[project] !== undefined) {
        currentArray[project].forEach(todo => {
            createDOMTodos(todo, project, currentArrayDOM);
        });
    }

    addToDoButtonFunk(currentArrayDOM);
    localStorage.setItem("lSCurrentArray", JSON.stringify(currentArray));
    console.log(localStorage.getItem("lSCurrentArray"));
    deleteEmptyProjects();
    console.log(localStorage.getItem("lSCurrentArray"));

}

export function addToDoButtonFunk(currentArrayDOM) {

    const addToDoButton = document.createElement("button");
    addToDoButton.textContent = "+";
    addToDoButton.classList.add("addToDoButton");
    currentArrayDOM.appendChild(addToDoButton);
    addToDoButton.addEventListener("click", addDialogAddTodo);
}

export function addDialogAddTodo(e) {
    const todoDialog = document.querySelector("#todoDialog");
    getProjectName = e.target.parentElement.id;
    todoDialog.showModal();
}

export let getProjectName;