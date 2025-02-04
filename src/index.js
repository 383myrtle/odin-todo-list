import "./normalize.css";
import "./styles.css";
import { addTask, sort, loadFromLocalStorage, getTasks, getProjects } from "./TaskController.js";
import { renderTasks, renderProjects, setUpTabs, renderCurrentTab } from "./DisplayController.js";
import { parse } from "date-fns";

const addTaskDialog = document.getElementById("add-task-dialog");
const sortDialog = document.getElementById("sort-dialog");

document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    setUpTabs();
    setUpEventListeners();

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

function setUpEventListeners(){
    const addTaskButton = document.getElementById("add-task");
    const submitTaskButton = document.getElementById("submit-task");
    const closeTaskDialogButton = document.getElementById("close-form");
    const sortButton = document.getElementById("sort");
    const sortSelect = document.getElementById("sort-select");

    addTaskButton.addEventListener("click", () => addTaskDialog.showModal());
    submitTaskButton.addEventListener("click", (e) => captureTaskDetails(e));
    closeTaskDialogButton.addEventListener("click", (e) => closeDialog(e));

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