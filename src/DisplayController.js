import { getTasks, deleteTask, getProjects, deleteProject, addProject } from "./TaskController.js";
import { format } from "date-fns";
import { isToday, isFuture } from "date-fns";
import checkNoFill from "./assets/icons/check_nofill.svg";
import checkFill from "./assets/icons/check_fill.svg";
import inbox from "./assets/icons/projects.svg";
import plus from "./assets/icons/add.svg";

const content = document.querySelector(".content");
const projectList = document.querySelector(".project-list");
const projects = getProjects();
const tasks = getTasks();
const tabs = [
    {id: "today", name: "Today", evaluate: (task) =>{
        return (isToday(task.dueDate) && !task.isCompleted());
    }},
    {id: "upcoming", name: "Upcoming", evaluate: (task) => {
        return (isFuture(task.dueDate) && !task.isCompleted());
    }},
    {id: "completed", name: "Completed", evaluate: (task) => {
        return (task.isCompleted());
    }},
];

const renderTasks = (mode, view) => {
    clearContent(content);
    const title = createElement("h1", {text: mode.name})
    const taskList = createElement("div", {classes: [view, "flex-col"]});
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
    projects.forEach((projectItem, index)=>{
        const project = createProject(projectItem, index);
        projectList.appendChild(project);
    });
    const addProjectButton = createAddProjectButton();
    projectList.appendChild(addProjectButton);
    renderProjectSelection();
}

const setUpTabs = () => {
    tabs.forEach((mode) => {
        const tab = document.getElementById(mode.id);
        tab.addEventListener("click", () => {
            setActiveTab(tab);
            renderTasks(mode, getCurrentView());
        });
    });
}

const setUpViewButtons = () => {
    const viewOptions = document.querySelector(".view-options");
    viewOptions.addEventListener("click", (e) => {
        const selectedView = e.target.closest("button");
        setActiveView(selectedView);
        renderCurrentTab();
    });
}

const renderCurrentTab = () => {
    const currentMode = tabs.find(t => t.id === document.querySelector(".active")?.id) || projects.find(p => p.id === document.querySelector(".active")?.id) || tabs[0];
    renderTasks(currentMode, getCurrentView());
}

const getCurrentView = () => {
    return document.querySelector(".active-view").id;
}

function setActiveTab(element) {
    const currentTab = document.querySelector(".active");
    if (currentTab){
        currentTab.classList.remove("active");
    }
    element.classList.add("active");
}

function setActiveView(element) {
    const currentView = document.querySelector(".active-view");
    currentView.classList.remove("active-view");
    element.classList.add("active-view");
}

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

function createCompleteButton(taskItem) {
    let completeIcon;
    const source = taskItem.isCompleted() ? checkFill : checkNoFill;
    const completeButton = createElement("button", {attributes: {id: "complete"}});
    completeIcon = createElement("img", {classes: ["icon-med"], attributes: {src: source, alt: "toggle complete"}});
    completeButton.appendChild(completeIcon);

    completeButton.addEventListener("click", () => {
        taskItem.toggleCompleted();
        renderCurrentTab();
    });
    return completeButton;
}

function createTask(taskItem) {
    const task = createElement("div", {classes: ["task", "flex-row", `priority-${taskItem.priority}`]})
    const completeButton = createCompleteButton(taskItem);

    const taskInfo = createElement("div", {classes: ["task-info"]});
    const taskTitle = createElement("h2", {text: taskItem.name});
    const taskDescription = createElement("p", {text: `${format(taskItem.dueDate, 'MMM dd')} · ${taskItem.description}`});
    taskInfo.append(taskTitle, taskDescription);
    
    const deleteButton = createElement("button", {text: "x", attributes: {id: "delete"}});
    deleteButton.addEventListener("click", ()=>{
        deleteTask(taskItem);
        renderCurrentTab();
    });

    task.append(completeButton, taskInfo, deleteButton);
    return task;
}

function createProject(projectItem, index){
    const project = createElement("button", {classes: ["flex-row"], attributes: {id: projectItem.id}});
    const projectIcon = createElement("img", {classes: ["icon-small"], attributes: {src: inbox, alt: "Projects"}});
    const projectName = createElement("span", {text: projectItem.name});
    project.append(projectIcon, projectName);
    
    if (projectItem.id!=="default"){
        const deleteButton = createElement("button", {text: "x", attributes: {id: "delete"}});
        deleteButton.addEventListener("click", (e)=>{
            e.stopPropagation();
            deleteProject(index);
            renderProjects();
            renderCurrentTab();
        });
        project.appendChild(deleteButton);
    }

    project.addEventListener("click", () => {
        setActiveTab(project);
        renderTasks(projectItem, getCurrentView());
    });

    return project;
}

function createAddProjectButton() {
    const addProjectButton = createElement("button", {classes: ["flex-row"], attributes:{id:"add-project"}});
    const addProjectIcon = createElement("img", {classes: ["icon-small"], attributes: {src: plus, alt: "Add project"}});
    const addProjectText = createElement("span", {text: "Add Project"});
    addProjectButton.append(addProjectIcon,addProjectText);

    addProjectButton.addEventListener("click", () => {
        const projName = prompt("Enter the project name");
        if (projName){
            addProject(projName);
            renderProjects();
        }
    });

    return addProjectButton;
}

function renderProjectSelection() {
    const projectSelection = document.getElementById("task-project");
    clearContent(projectSelection);
    projectSelection.appendChild(createElement("option", {text: "Select project", attributes: {value: "", disabled: true, selected: true}}));
    projects.forEach((project) => {
        console.log(project);
        const option = createElement("option", {text: project.name, attributes: {value: project.name}});
        projectSelection.appendChild(option);
    });
}

export { renderTasks, renderProjects, setUpTabs, setUpViewButtons, renderCurrentTab };

