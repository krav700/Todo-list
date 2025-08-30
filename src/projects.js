import { currentArray, getUserInput } from "./index.js";
import { addToDoButtonFunk } from "./todos.js";

const userInputFunk = getUserInput();

export function addNewProject(name) {
    currentArray[name] = [];
    createDomProject(name);
}

function createDomProject(projectName) {
    const allProjects = document.querySelector("#projects");

    const projectDiv = document.createElement("div");

    const projectTitle = document.createElement("h1");
    projectTitle.textContent = projectName;

    projectDiv.classList.add("projectBlock");
    projectDiv.id = projectName;

    projectDiv.appendChild(projectTitle);
    allProjects.appendChild(projectDiv);
    addToDoButtonFunk(projectDiv);
}

export function updateArray() {
    Object.keys(currentArray).forEach(project => {
        createDomProject(project);
    });
}

