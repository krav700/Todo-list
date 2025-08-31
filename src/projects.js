import { currentArray } from "./index.js";
import { addToDoButtonFunk } from "./todos.js";

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

export function addProjectButtonFunk() {
    const projects = document.querySelector("#projects");
    addProjectButton = document.createElement("button");
    addProjectButton.textContent = "+";
    addProjectButton.classList.add("addProjectButton");
    projects.appendChild(addProjectButton);
    addProjectButton.addEventListener("click", addDialogAddProject);
}

export let addProjectButton;

export function addDialogAddProject() {
    const projectDialog = document.querySelector("#projectDialog");
    projectDialog.showModal();
}