import { currentArray, getUserInput } from "./index.js";

const userInputFunk = getUserInput();

function todo(title = "", description = "", dueDate = "", priority = "Low") {
    return { title, description, dueDate, priority };
}

function createDOMTodos(currentTodo, project, currentArrayDOM) {
    
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

    todoBlock.classList.add(`priority-${currentTodo.priority}`);
    todoBlock.classList.add("todoBlock");

    const textBlock = document.createElement("div");
    textBlock.classList.add("todoTextBlock");
    textBlock.appendChild(title);
    textBlock.appendChild(description);

    xRemoveTodo.addEventListener("click", () => {
        removeTodo(project, todoBlock)
    });

    todoBlock.appendChild(completedTodo);
    todoBlock.appendChild(textBlock);
    todoBlock.appendChild(dueDate);
    todoBlock.appendChild(xRemoveTodo);

    currentArrayDOM.appendChild(todoBlock);
}

export function createToDo(project) {
    currentArray[project].push(todo(userInputFunk.name, 
                                                userInputFunk.description,
                                                userInputFunk.dueDate,
                                                userInputFunk.priority
    ));
    updateToDoArrays(project);
}

function updateToDoArrays(project) {
    const currentArrayDOM = document.querySelector(`#${project}`);
    console.log(currentArrayDOM);
    currentArrayDOM.textContent = "";

    const projectTitle = document.createElement("h1");
    projectTitle.textContent = project;

    currentArrayDOM.appendChild(projectTitle);

    currentArray[project].forEach(todo => {
        createDOMTodos(todo, project, currentArrayDOM);
    });

    addToDoButtonFunk(currentArrayDOM);
}

function removeTodo(project, todoBlock) {
    const blockIndex = currentArray[project].indexOf(todoBlock);

    currentArray[project].splice(blockIndex, 1);
    updateToDoArrays(project);
}

export function addToDoButtonFunk(currentArrayDOM) {
    const addToDoButton = document.createElement("button");
    addToDoButton.textContent = "+";
    addToDoButton.classList.add("addToDoButton");
    currentArrayDOM.appendChild(addToDoButton);
}