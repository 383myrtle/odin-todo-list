import { getTasks, deleteTask, getProjects, deleteProject, addProject } from "./TaskController.js";
import { format } from "date-fns";
import checkIcon from "./assets/icons/check_nofill.svg";
import checkFill from "./assets/icons/check_fill.svg";
import inbox from "./assets/icons/projects.svg";
import plus from "./assets/icons/add.svg";

const content = document.querySelector(".content");
const projectList = document.querySelector(".project-list");
const projects = getProjects();

function clearContent(element) {
    element.textContent = "";
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

function createTask(taskItem, mode) {
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
        renderTasks(mode);
    });

    const taskInfo = createElement("div", {classes: ["task-info"]});
    const taskTitle = createElement("h2", {text: taskItem.name});
    const taskDescription = createElement("p", {text: `Due: ${format(taskItem.dueDate, 'MMM dd')} · ${taskItem.description}`});
    taskInfo.append(taskTitle, taskDescription);
    
    const deleteButton = createElement("button", {text: "x", attributes: {id: "delete"}});
    deleteButton.addEventListener("click", ()=>{
        deleteTask(taskItem);
        renderTasks(mode);
    });

    task.append(completeButton, taskInfo, deleteButton);
    return task;
}

function createProject(projectItem, index){
    const project = createElement("button", {attributes: {id: projectItem.id}});
    const projectIcon = createElement("img", {classes: ["icon-small"], attributes: {src: inbox, alt: "Projects"}});
    const projectName = createElement("span", {text: projectItem.name});
    project.append(projectIcon, projectName);
    
    if (projectItem.id!=="default"){
        const deleteButton = createElement("button", {text: "x", attributes: {id: "delete"}});
        deleteButton.addEventListener("click", (e)=>{
            e.stopPropagation();
            projects[index].removeAllTasks();
            deleteProject(index);
            renderProjects();
        });
        project.appendChild(deleteButton);
    }

    project.addEventListener("click", () => {
        const currentTab = document.querySelector(".active");
        if (currentTab){
            currentTab.classList.remove("active");
        }
        project.classList.add("active");
        renderTasks(projectItem);
    });

    return project
}

const renderTasks = (mode) => {
    clearContent(content);
    const tasks = getTasks();
    tasks.forEach((task) => {
        console.log(task.name);
    });

    const title = createElement("h1", {text: mode.name})
    const taskList = createElement("div", {classes: ["task-list", "flex-col"]});
    tasks.forEach((taskItem)=>{
        if (mode.evaluate(taskItem)){
            const task = createTask(taskItem, mode);
            taskList.appendChild(task);
        }
    });
    content.append(title, taskList);
}

const renderProjects = () => {
    clearContent(projectList);
    console.log(projects.toString());
    projects.forEach((projectItem, index)=>{
        const project = createProject(projectItem, index);
        projectList.appendChild(project);
    });
    
    //Add project button
    const addProjectButton = createElement("button", {attributes:{id:"add-project"}});
    const addProjectIcon = createElement("img", {classes: ["icon-small"], attributes: {src: plus, alt: "Add project"}});
    const addProjectText = createElement("span", {text: "Add Project"});
    addProjectButton.append(addProjectIcon,addProjectText);
    addProjectButton.addEventListener("click", () => {
        console.log("Add project button pressed");
        const projName = prompt("Enter the project name");
        if (projName){
            addProject(projName);
            renderProjects();
        }
    });

    projectList.appendChild(addProjectButton);

    const projectSelection = document.getElementById("task-project");
    clearContent(projectSelection);
    projectSelection.appendChild(createElement("option", {text: "Select project", attributes: {value: "", disabled: true, selected: true}}));
    projects.forEach((project) => {
        const option = createElement("option", {text: project.name, attributes: {value: project.name}});
        projectSelection.appendChild(option);
    });
}

export { renderTasks, renderProjects };

