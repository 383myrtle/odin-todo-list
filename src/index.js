import "./normalize.css";
import "./styles.css";
import { addTask, sort, loadFromLocalStorage, getTasks, getProjects } from "./TaskController.js";
import { renderTasks, renderProjects } from "./DisplayController.js";
import { isToday, isFuture, parse } from "date-fns";

const dialog = document.getElementById("add-task-dialog");
const tabs = [
    {id: "today", name: "Today", evaluate: (task) =>{
        console.log(`Name: ${task.name}. Due date: ${task.dueDate}. Completed: ${task.isCompleted()}`);
        return (isToday(task.dueDate) && !task.isCompleted()) ? true : false;
    }},
    {id: "upcoming", name: "Upcoming", evaluate: (task) => {
        return (isFuture(task.dueDate) && !task.isCompleted()) ? true : false;
    }},
    {id: "completed", name: "Completed", evaluate: (task) => {
        return (task.isCompleted());
    }},
];

document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    console.log(getTasks());

    tabs.forEach((mode) => {
        const tab = document.getElementById(mode.id);
        tab.addEventListener("click", () => {
            const currentTab = document.querySelector(".active");
            if (currentTab){
                currentTab.classList.remove("active");
            }
            tab.classList.add("active");    
            renderTasks(mode);
        });
    });

    const addTaskButton = document.getElementById("add-task");
    const submitButton = document.getElementById("submit-task");
    const closeDialogButton = document.getElementById("close-form");
    const sortButton = document.getElementById("sort");
    const sortSelect = document.getElementById("sort-select");
    const sortDialog = document.getElementById("sort-dialog");

    addTaskButton.addEventListener("click", () => dialog.showModal());
    submitButton.addEventListener("click", (e) => captureTaskDetails(e));
    closeDialogButton.addEventListener("click", (e) =>{
        e.preventDefault();
        dialog.close();
    });
    sortButton.addEventListener("click", () => sortDialog.show());
    sortSelect.addEventListener("change", () => {
        const sortMode = sortSelect.value;
        sort(sortMode);
        const currentMode = tabs.find(t => t.id === document.querySelector(".active").id) || tabs[0];
        renderTasks(currentMode);
        sortSelect.selectedIndex = 0;
        sortDialog.close();
    });
    sortDialog.addEventListener("focusout", () => sortDialog.close());

    /* Start on today tab on page load */
    renderTasks(tabs[0]);
    renderProjects();
});

const captureTaskDetails = (e) => {
    e.preventDefault();

    const taskName = document.getElementById("task-name").value;
    const taskDate = document.getElementById("task-date").value;
    const taskProject = document.getElementById("task-project").value;
    const taskPriority = document.getElementById("task-priority").value;
    const taskDescription = document.getElementById("task-description").value;

    if (!(taskPriority && taskProject && taskDate)){
        alert("Select a project, priority, and due date");
        return;
    }
    addTask(taskName, taskDescription, parse(taskDate, "yyyy-MM-dd", new Date()), taskPriority, taskProject);

    const form = document.querySelector("form");
    form.reset();

    const currentMode = tabs.find(t => t.id === document.querySelector(".active").id) || tabs[0];
    renderTasks(currentMode);
    dialog.close();
}