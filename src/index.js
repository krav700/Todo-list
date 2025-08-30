import "./styles.css"
import { createToDo } from "./todos.js";
import { addNewProject } from "./projects.js";

window.createToDo = createToDo;
window.addNewProject = addNewProject;

export let currentArray = {
    default: [],
};

export function getUserInput() {

    // const todoName = document.querySelector("#todoName").value;
    // const todoDesc = document.querySelector("#todoDesc").value;
    // const todoDueDate = document.querySelector("#todoDueDate").value;
    // const todoPriority = document.querySelector("#todoPriority").value;

    const name = "test name";
    const description = "test description";
    const dueDate = "12.12.2022";
    const priority = "Low";

    return { name, description, dueDate, priority }; 
}

const start = function() {
    //form.addEventListener("submit", getUserInput);
}();






