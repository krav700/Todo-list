import { currentArray, deleteEmptyProjects } from "./index.js";
import { removeProject } from "./projects.js";

function todo(title = "", description = "", dueDate = "", priority = "Low", completed = false) {
    return { title, description, dueDate, priority, completed };
}

export function createDOMTodos(currentTodo, project, currentArrayDOM) {

    const todoBlock = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = currentTodo.title;

    const description = document.createElement("p");
    description.textContent = currentTodo.description;
    description.classList.add("description");

    const dueDate = document.createElement("h3");
    dueDate.textContent = currentTodo.dueDate;

    const completedTodo = document.createElement("input");
    completedTodo.type = "checkbox";
    if (currentTodo.completed) {
        completedTodo.checked = true;
    }

    checkboxChecked(project, completedTodo, title, description, currentTodo, todoBlock);

    completedTodo.addEventListener("change", () => {
        checkboxChecked(project, completedTodo, title, description, currentTodo, todoBlock);
    });

    const xRemoveTodo = document.createElement("button");
    xRemoveTodo.textContent = "X";
    xRemoveTodo.classList.add("removeToDoButton");

    todoBlock.classList.add(`priority-${currentTodo.priority}`, "todoBlock");

    const shownProperties = document.createElement("div");
    shownProperties.classList.add("shownProperties");
    shownProperties.append(completedTodo, title, dueDate);

    todoBlock.append(xRemoveTodo, shownProperties, description);

    xRemoveTodo.addEventListener("click", () => {
        removeTodo(project, currentTodo);
    });

    todoBlock.addEventListener("mouseover", () => {
        description.classList.add("visible");
    });
    todoBlock.addEventListener("mouseleave", () => {
        description.classList.remove("visible");
    });

    currentArrayDOM.appendChild(todoBlock);
}

function checkboxChecked(project, completedTodo, title, description, currentTodo, todoBlock) {

    const blockIndex = currentArray[project].findIndex(todo =>
        todo.title === currentTodo.title &&
        todo.description === currentTodo.description &&
        todo.dueDate === currentTodo.dueDate &&
        todo.priority === currentTodo.priority
      );
      
      if (blockIndex !== -1) {

        if (completedTodo.checked) {
            title.style.textDecoration = "line-through";
            description.style.textDecoration = "line-through";
            if (currentTodo.priority == "High") {
                todoBlock.style.background = `rgb(255 0 0 / 0.6)`;
            }
            else if (currentTodo.priority == "Mid") {
                todoBlock.style.background = `rgb(255 165 0 / 0.6)`;
            }
            else if (currentTodo.priority == "Low") {
                todoBlock.style.background = `rgb(173 255 47 / 0.6)`;
            }
            currentArray[project][blockIndex].completed = true;
            localStorage.setItem("lSCurrentArray", JSON.stringify(currentArray));
        }
        else {
            title.classList.remove("stike");
            title.style.textDecoration = "none";
            description.style.textDecoration = "none";
            todoBlock.style.background = "#FFF";
            currentArray[project][blockIndex].completed = false;
            localStorage.setItem("lSCurrentArray", JSON.stringify(currentArray));
        }


      }
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
      }

    updateToDoArrays(project);
}

export function createToDo(project, todoName, todoDesc, todoDueDate, todoPriority, todoCompleted) {
    currentArray[project].push(todo(todoName,
                                    todoDesc,
                                    todoDueDate,
                                    todoPriority,
                                    todoCompleted ));
    updateToDoArrays(project);
}

function updateToDoArrays(project) {
    const currentArrayDOM = document.querySelector(`#${project}`);
    currentArrayDOM.textContent = "";

    const projectTitle = document.createElement("h1");
    projectTitle.textContent = project;

    if (project != "default") {
        const xRemoveProject = document.createElement("button");
        xRemoveProject.textContent = "X";
        xRemoveProject.classList.add("removeProjectButton");
        xRemoveProject.addEventListener("click", () => {
            removeProject(projectName);
        });

        currentArrayDOM.append(xRemoveProject, projectTitle);
    }
    else {
        currentArrayDOM.append(projectTitle);
    }


    
    if (currentArray[project] !== undefined) {
        currentArray[project].forEach(todo => {
            createDOMTodos(todo, project, currentArrayDOM);
        });
    }

    localStorage.setItem("lSCurrentArray", JSON.stringify(currentArray));
    deleteEmptyProjects();
    addToDoButtonFunk(currentArrayDOM);

}

export function addToDoButtonFunk(currentArrayDOM) {

    const addToDoButton = document.createElement("button");
    addToDoButton.classList.add("addToDoButton");
    currentArrayDOM.appendChild(addToDoButton);
    addToDoButton.addEventListener("click", addDialogAddTodo);
}

export function addDialogAddTodo(e) {
    const todoDialog = document.querySelector("#todoDialog");
    getProjectName = e.target.parentElement.id;
    let scrollY = window.scrollY;
    todoDialog.showModal();
    
    window.scrollTo(0, scrollY);
}

export let getProjectName;