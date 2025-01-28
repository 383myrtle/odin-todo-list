import { getTasks, deleteTask } from "./TaskController.js";
import checkIcon from "./assets/icons/check_nofill.svg";
import checkFill from "./assets/icons/check_fill.svg";
import { format } from "date-fns";

const content = document.querySelector(".content");
const tasks = getTasks();

function clearContent() {
    content.textContent = "";
}

function createElement(type, options = {}) {
    const element = document.createElement(type);

    if (options.classes){ // array of strings
        element.classList.add(...options.classes);
    }

    if (options.text){ // string
        element.textContent = options.text;
    }

    if (options.attributes){ // object in the form {attribute: value}
        Object.entries(options.attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }
    return element;
}

function createTask(taskItem, mode, index) {
    const task = createElement("div", {classes: ["task", "flex-row", `priority-${taskItem.priority}`]})
    let completeIcon;

    const completeButton = createElement("button", {attributes: {id: "complete"}});
    if (taskItem.isCompleted()){
        completeIcon = createElement("img", {classes: ["icon-med"], attributes: {src: checkFill, alt: "mark incomplete"}});
    }
    else{
        completeIcon = createElement("img", {classes: ["icon-med"], attributes: {src: checkIcon, alt: "mark complete"}});
    }
    completeButton.appendChild(completeIcon);
    completeButton.addEventListener("click", () => {
        taskItem.toggleCompleted();
        completeIcon.src = completeIcon.src === checkIcon ? checkFill : checkIcon;
        render(mode);
    });

    const taskInfo = createElement("div", {classes: ["task-info"]});
    const taskTitle = createElement("h2", {text: taskItem.name});
    const taskDescription = createElement("p", {text: `Due: ${format(taskItem.dueDate, 'MMM dd')} · ${taskItem.description}`});
    taskInfo.append(taskTitle, taskDescription);
    
    const deleteButton = createElement("button", {text: "x", attributes: {id: "delete"}});
    deleteButton.addEventListener("click", ()=>{
        deleteTask(index);
        render(mode);
    });

    task.append(completeButton, taskInfo, deleteButton);
    return task;
}


const render = (mode) => {
    clearContent();
    const title = createElement("h1", {text: mode.name})
    const taskList = createElement("div", {classes: ["task-list", "flex-col"]});
    tasks.forEach((taskItem, index)=>{
        if (mode.evaluate(taskItem)){
            const task = createTask(taskItem, mode, index);
            taskList.appendChild(task);
        }
    });
    content.append(title, taskList);
}

export { render };

