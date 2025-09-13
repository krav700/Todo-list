import { currentArray, deleteEmptyProjects } from "./index.js";
import { removeProject } from "./projects.js";
import { format } from "date-fns";

function todo(title = "", description = "", dueDate = "", priority = "Low", completed = false) {
    return { title, description, dueDate, priority, completed };
}

export function createDOMTodos(currentTodo, project, currentArrayDOM) {

    const todoBlock = document.createElement("div");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("edit-input");

    const title = document.createElement("h2");
    title.textContent = currentTodo.title;

    titleDiv.appendChild(title);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("edit-input");

    const description = document.createElement("p");
    description.textContent = currentTodo.description;
    description.classList.add("description");

    descriptionDiv.appendChild(description);

    const dueDateDiv = document.createElement("div");
    dueDateDiv.classList.add("edit-input");

    const dueDate = document.createElement("h3");
    dueDate.textContent = currentTodo.dueDate;

    dueDateDiv.appendChild(dueDate);

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
    shownProperties.append(completedTodo, titleDiv, dueDateDiv);

    todoBlock.append(xRemoveTodo, shownProperties, descriptionDiv);

    title.addEventListener("click", () => {
        const titleInput = document.createElement("input");
        titleInput.classList.add("title-input");
        titleInput.value = title.textContent;
        title.textContent = "";

        titleDiv.appendChild(titleInput);
        shownProperties.removeChild(titleDiv);
        shownProperties.removeChild(dueDateDiv);
        shownProperties.appendChild(titleDiv);
        shownProperties.appendChild(dueDateDiv);

        titleInput.focus();
        titleInput.addEventListener("blur", () => {
            title.textContent = titleInput.value;
            titleDiv.removeChild(titleInput);
            
            const blockIndex = currentArray[project].findIndex(todo =>
                todo.title === currentTodo.title &&
                todo.description === currentTodo.description &&
                todo.dueDate === currentTodo.dueDate &&
                todo.priority === currentTodo.priority
              );
              
              if (blockIndex !== -1) {
                currentArray[project][blockIndex].title = title.textContent;
                localStorage.setItem("lSCurrentArray", JSON.stringify(currentArray));
              }
            
        });
    });

    description.addEventListener("click", () => {
        const descriptionInput = document.createElement("input");
        descriptionInput.classList.add("description-input");
        descriptionInput.value = description.textContent;
        description.textContent = "";

        descriptionDiv.appendChild(descriptionInput);
        todoBlock.removeChild(descriptionDiv);
        todoBlock.appendChild(descriptionDiv);

        descriptionInput.focus();
        descriptionInput.addEventListener("blur", () => {
            description.textContent = descriptionInput.value;
            descriptionDiv.removeChild(descriptionInput);
            
            const blockIndex = currentArray[project].findIndex(todo =>
                todo.title === currentTodo.title &&
                todo.description === currentTodo.description &&
                todo.dueDate === currentTodo.dueDate &&
                todo.priority === currentTodo.priority
              );
              
              if (blockIndex !== -1) {
                currentArray[project][blockIndex].description = description.textContent;
                localStorage.setItem("lSCurrentArray", JSON.stringify(currentArray));
              }
            
        });
    });

    dueDate.addEventListener("click", () => {
        const dueDateInput = document.createElement("input");
        dueDateInput.type = "date";
        dueDateInput.classList.add("dueDate-input");
        dueDateInput.value = description.textContent;
        dueDate.textContent = "";

        dueDateDiv.appendChild(dueDateInput);
        shownProperties.removeChild(dueDateDiv);
        shownProperties.appendChild(dueDateDiv);

        dueDateInput.focus();
        dueDateInput.addEventListener("blur", () => {

            const datePicked = dueDateInput.value;

            let todoDueDate = format(new Date(), "E, MMM dd");
            if (datePicked != "") {
                const yearMonthDay = datePicked.split("-");
                todoDueDate = format(new Date(yearMonthDay[0], yearMonthDay[1] - 1, yearMonthDay[2]), "E, MMM dd");
            }

            dueDate.textContent = todoDueDate;
            dueDateDiv.removeChild(dueDateInput);
            
            const blockIndex = currentArray[project].findIndex(todo =>
                todo.title === currentTodo.title &&
                todo.description === currentTodo.description &&
                todo.dueDate === currentTodo.dueDate &&
                todo.priority === currentTodo.priority
              );
              
              if (blockIndex !== -1) {
                currentArray[project][blockIndex].dueDate = dueDate.textContent;
                localStorage.setItem("lSCurrentArray", JSON.stringify(currentArray));
              }
            
        });
    });

    todoBlock.addEventListener("dblclick", () => {
        
        const blockIndex = currentArray[project].findIndex(todo =>
            todo.title === currentTodo.title &&
            todo.description === currentTodo.description &&
            todo.dueDate === currentTodo.dueDate &&
            todo.priority === currentTodo.priority
        );
          
        if (blockIndex !== -1) {
    
            if (todoBlock.classList.contains('priority-Low')) {
                todoBlock.classList.remove('priority-Low');
                todoBlock.classList.add('priority-Mid');
                currentTodo.priority = "Mid";
                currentArray[project][blockIndex].priority = "Mid";
            }
            else if (todoBlock.classList.contains('priority-Mid')) {
                todoBlock.classList.remove('priority-Mid');
                todoBlock.classList.add('priority-High');
                currentTodo.priority = "High";
                currentArray[project][blockIndex].priority = "High";
            }
            else if (todoBlock.classList.contains('priority-High')) {
                todoBlock.classList.remove('priority-High');
                todoBlock.classList.add('priority-Low');
                currentTodo.priority = "Low";
                currentArray[project][blockIndex].priority = "Low";
            }
        }   
        checkboxChecked(project, completedTodo, title, description, currentTodo, todoBlock);
    });



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
                todoBlock.classList.add("priority-HighBG");
                todoBlock.classList.remove("priority-MidBG");
                todoBlock.classList.remove("priority-LowBG");
            }
            else if (currentTodo.priority == "Mid") {
                todoBlock.classList.remove("priority-HighBG");
                todoBlock.classList.add("priority-MidBG");
                todoBlock.classList.remove("priority-LowBG");
            }
            else if (currentTodo.priority == "Low") {
                todoBlock.classList.remove("priority-HighBG");
                todoBlock.classList.remove("priority-MidBG");
                todoBlock.classList.add("priority-LowBG");
            }
            currentArray[project][blockIndex].completed = true;
            localStorage.setItem("lSCurrentArray", JSON.stringify(currentArray));
        }
        else {
            title.style.textDecoration = "none";
            description.style.textDecoration = "none";

            todoBlock.classList.remove("priority-HighBG");
            todoBlock.classList.remove("priority-MidBG");
            todoBlock.classList.remove("priority-LowBG");

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