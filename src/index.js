import "./styles.css"
import { format, startOfToday } from "date-fns";
import { createToDo, addDialogAddTodo, getProjectName, createDOMTodos, addToDoButtonFunk } from "./todos.js";
import { addNewProject, addDialogAddProject, addProjectButtonFunk } from "./projects.js";

window.createToDo = createToDo;
window.addNewProject = addNewProject;

export let currentArray = {
    default: [],
};

if (localStorage.getItem("lSCurrentArray") != "{}") {
    currentArray = Object.assign({}, JSON.parse(localStorage.getItem("lSCurrentArray")));
}   


const getUserInput = function () {

    const todoDialogForm = document.querySelector("#todoDialogForm");
    todoDialogForm.addEventListener("submit", () => {
        const todoName = todoDialogForm.todoName.value;
        const todoDesc = todoDialogForm.todoDescription.value;
        const datePicked = todoDialogForm.todoDueDate.value;
        const todoPriority = todoDialogForm.todoPriority.value;
        let todoDueDate = format(new Date(), "E, MMM dd");
        if (datePicked != "") {
            const yearMonthDay = datePicked.split("-");
            todoDueDate = format(new Date(yearMonthDay[0], yearMonthDay[1] - 1, yearMonthDay[2]), "E, MMM dd");
        }
        createToDo(getProjectName, todoName, todoDesc, todoDueDate, todoPriority);
    });


    const projectDialogForm = document.querySelector("#projectDialogForm");
    projectDialogForm.addEventListener("submit", () => {
        const oldAddProjectButton = document.querySelector(".addProjectButton");
        oldAddProjectButton.remove();
        const projectName = projectDialogForm.projectName.value;
        addNewProject(currentArray, projectName);
        addProjectButtonFunk();
    });
}();

const start = function() {
    const innitAddToDoButton = document.querySelector(".addToDoButton");
    innitAddToDoButton.addEventListener("click", addDialogAddTodo);
    
    const initAddProjectButton = document.querySelector(".addProjectButton");
    initAddProjectButton.addEventListener("click", addDialogAddProject);
}();

export const parsedArray = JSON.parse(localStorage.getItem("lSCurrentArray"));

if (parsedArray) {
    updatePage(parsedArray);
}

export function updatePage(neededArray) {
    Object.keys(neededArray).forEach(project => {
        if (neededArray[project].length == 0) {
            delete neededArray[project];
        }
        else {
            
            if (project != "default") {
                addNewProject(neededArray, project);
            }
            const currentArrayDOM = document.querySelector(`#${project}`);
            for (let i = 0; i < neededArray[project].length; i++) {
                createDOMTodos(neededArray[project][i], project, currentArrayDOM);
            }

            addToDoButtonFunk(currentArrayDOM);

            const innitAddTodoButton = document.querySelector(`#${project} .addToDoButton`);
            currentArrayDOM.removeChild(innitAddTodoButton);
        }
    });
    const inniAddProjectButton = document.querySelector(".addProjectButton");
    const projects = document.querySelector("#projects");
    projects.removeChild(inniAddProjectButton);
    addProjectButtonFunk();
}

window.addEventListener("beforeunload", deleteEmptyProjects);

export function deleteEmptyProjects() {
    Object.keys(currentArray).forEach(project => {
        if (currentArray[project].length == 0 && project != "default") {
            delete currentArray[project];
        }
    });
    localStorage.setItem("lSCurrentArray", JSON.stringify(currentArray));
}

export function addDefaultProject(allProjects) {
    const defaultDiv = document.createElement("div");
    defaultDiv.id = "default";
    defaultDiv.classList.add("projectBlock");

    const defaultTitle = document.createElement("h1");
    defaultTitle.textContent = "default";

    const defaultButton = document.createElement("button");
    defaultButton.classList.add("addToDoButton");
    defaultButton.textContent = "+";

    defaultDiv.append(defaultTitle, defaultButton);
    allProjects.append(defaultDiv);
    addProjectButtonFunk();
}