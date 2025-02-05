import "./normalize.css";
import "./styles.css";
import { addTask, sort, loadFromLocalStorage, getTasks, getProjects } from "./TaskController.js";
import { setUpViewButtons, renderProjects, setUpTabs, renderCurrentTab } from "./DisplayController.js";
import { parse } from "date-fns";

const addTaskDialog = document.getElementById("add-task-dialog");
const sortDialog = document.getElementById("sort-dialog");

document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    if (getTasks().length === 0){
        addTask("Add a new task", "Press the 'Add Task' button in the left sidebar", new Date(Date.now()), "high", "Default");
        addTask("Add a new project", "Press the 'Add Project' button in the left sidebar" , new Date(Date.now()), "medium", "Default");
        addTask("Change view", "Choose from list or grid view, or change how tasks are sorted using the buttons in the top right", new Date(Date.now()), "medium", "Default");
        addTask("Mark a task complete", "Press the check mark on the left of this task, view your completed tasks in the 'Completed' tab", new Date(Date.now()), "high", "Default");
        addTask("Remove this task", "Press the 'x' button to the right of this task", new Date(Date.now()), "low", "Default");
    }
    setUpTabs();
    setUpTaskDialog();
    setUpSortDialog();
    setUpViewButtons();

    renderCurrentTab(); // Start on Today tab
    renderProjects();
});

function captureTaskDetails(e) {
    e.preventDefault();
    const form = document.querySelector("form");
    const taskDetails = getTaskDetails();

    if (validateTask(taskDetails)){
        addTask(taskDetails.name, taskDetails.description, parse(taskDetails.date, "yyyy-MM-dd", new Date()), taskDetails.priority, taskDetails.project);
        form.reset();
        renderCurrentTab();
        closeDialog(e);
    }
    else {
        const errorMsg = document.createElement("div")
        errorMsg.textContent = "Error, please complete all fields";
        form.appendChild(errorMsg);
    }
}

function validateTask(taskDetails){
    return (taskDetails.date && taskDetails.project && taskDetails.priority);
}

function getTaskDetails() {
    const {value: name} = document.getElementById("task-name");
    const {value: date} = document.getElementById("task-date");
    const {value: project} = document.getElementById("task-project");
    const {value: priority} = document.getElementById("task-priority");
    const {value: description} = document.getElementById("task-description");

    return { name, date, project, priority, description }
}

function setUpTaskDialog() {
    const addTaskButton = document.getElementById("add-task");
    const submitTaskButton = document.getElementById("submit-task");
    const closeTaskDialogButton = document.getElementById("close-form");
    addTaskButton.addEventListener("click", () => addTaskDialog.showModal());
    submitTaskButton.addEventListener("click", (e) => captureTaskDetails(e));
    closeTaskDialogButton.addEventListener("click", (e) => closeDialog(e));
}

function setUpSortDialog(){
    const sortButton = document.getElementById("sort");
    const sortSelect = document.getElementById("sort-select");
    sortButton.addEventListener("click", () => sortDialog.show());
    sortSelect.addEventListener("change", handleSort);
    sortDialog.addEventListener("focusout", () => sortDialog.close());
}

function handleSort() {
    const sortSelect = document.getElementById("sort-select");
    sort(sortSelect.value);
    sortSelect.selectedIndex = 0;
    renderCurrentTab();
    sortDialog.close();
}

function closeDialog(e) {
    e.preventDefault();
    e.target.closest("dialog").close();
}