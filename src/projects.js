import { currentArray, updatePage, addDefaultProject } from "./index.js";
import { addToDoButtonFunk } from "./todos.js";

export function addNewProject(projectArray ,name) {
    if (!projectArray[name]) {
        projectArray[name] = [];
    }
    createDomProject(name);
}

function createDomProject(projectName) {
    const allProjects = document.querySelector("#projects");

    const projectDiv = document.createElement("div");
    projectDiv.classList.add("projectBlock");
    projectDiv.id = projectName;

    
    const projectTitle = document.createElement("h1");
    projectTitle.textContent = projectName;

    if (projectName != "default") {
        const xRemoveProject = document.createElement("button");
        xRemoveProject.textContent = "X";
        xRemoveProject.classList.add("removeProjectButton");
        xRemoveProject.addEventListener("click", () => {
            removeProject(projectName);
        });
        projectDiv.append(xRemoveProject, projectTitle);
    }
    else {
        projectDiv.append(projectTitle);
    }

    allProjects.appendChild(projectDiv);
    addToDoButtonFunk(projectDiv);
}

export function removeProject(project) {
    if (project != "default") {
        delete currentArray[project];
    }
    const allProjects = document.querySelector("#projects");
    allProjects.textContent = "";
    addDefaultProject(allProjects);

    updatePage(currentArray);
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

    let scrollY = window.scrollY;
    projectDialog.showModal();
    window.scrollTo(0, scrollY);
}