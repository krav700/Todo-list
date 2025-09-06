import "./styles.css"
import { format } from "date-fns";
import { createToDo, addDialogAddTodo, getProjectName, createDOMTodos, addToDoButtonFunk } from "./todos.js";
import { addNewProject, addDialogAddProject, addProjectButtonFunk, addProjectButton } from "./projects.js";

window.createToDo = createToDo;
window.addNewProject = addNewProject;

export let currentArray = {
    default: [],
};

if (localStorage.getItem("lSCurrentArray") != "{}") {
    currentArray = JSON.parse(localStorage.getItem("lSCurrentArray"));
}   


const getUserInput = function () {


    const todoDialogForm = document.querySelector("#todoDialogForm");
    todoDialogForm.addEventListener("submit", () => {
        const todoName = todoDialogForm.todoName.value;
        const todoDesc = todoDialogForm.todoDescription.value;
        const datePicked = todoDialogForm.todoDueDate.value;
        const yearMonthDay = datePicked.split("-");
        const todoDueDate = format(new Date(yearMonthDay[0], yearMonthDay[1], yearMonthDay[2]), "E, MMM dd");
        const todoPriority = todoDialogForm.todoPriority.value;
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
    Object.keys(parsedArray).forEach(project => {
            if (parsedArray[project].length == 0) {
                delete parsedArray[project];
            }
            else {
                
                if (project != "default") {
                    addNewProject(parsedArray, project);
                }
                const currentArrayDOM = document.querySelector(`#${project}`);

                for (let i = 0; i < parsedArray[project].length; i++) {
                    createDOMTodos(parsedArray[project][i], project, currentArrayDOM);
                }

                addToDoButtonFunk(currentArrayDOM);

                const innitAddTodoButton = document.querySelector(`#${project} button`);
                currentArrayDOM.removeChild(innitAddTodoButton);
            }
        });
    const inniAddProjectButton = document.querySelector(".addProjectButton");
    const projects = document.querySelector("#projects");
    projects.removeChild(inniAddProjectButton);
    addProjectButtonFunk();
}

window.addEventListener("beforeunload", () => {
    Object.keys(currentArray).forEach(project => {
        if (currentArray[project].length == 0) {
            delete currentArray[project];
        }
    });
    if (Object.keys(parsedArray).length > Object.keys(currentArray).length) {
        localStorage.setItem("lSCurrentArray", JSON.stringify(parsedArray));    
    }
    else {
        localStorage.setItem("lSCurrentArray", JSON.stringify(currentArray));
    }
});