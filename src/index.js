import "./styles.css"
import { createToDo, addDialogAddTodo, getProjectName } from "./todos.js";
import { addNewProject, addDialogAddProject, addProjectButtonFunk, addProjectButton } from "./projects.js";

window.createToDo = createToDo;
window.addNewProject = addNewProject;

export let currentArray = {
    default: [],
};

const getUserInput = function () {

    const todoDialogForm = document.querySelector("#todoDialogForm");
    todoDialogForm.addEventListener("submit", () => {
        const todoName = todoDialogForm.todoName.value;
        const todoDesc = todoDialogForm.todoDescription.value;
        const todoDueDate = todoDialogForm.todoDueDate.value;
        const todoPriority = todoDialogForm.todoPriority.value;  
        createToDo(getProjectName, todoName, todoDesc, todoDueDate, todoPriority);
    });

    const projectDialogForm = document.querySelector("#projectDialogForm");
    projectDialogForm.addEventListener("submit", () => {
        const oldAddProjectButton = document.querySelector(".addProjectButton");
        oldAddProjectButton.remove();
        const projectName = projectDialogForm.projectName.value;
        addNewProject(projectName);
        addProjectButtonFunk();
    });
}();

const start = function() {
    const innitAddToDoButton = document.querySelector(".addToDoButton");
    innitAddToDoButton.addEventListener("click", addDialogAddTodo);
    
    const initAddProjectButton = document.querySelector(".addProjectButton");
    initAddProjectButton.addEventListener("click", addDialogAddProject);
}();








