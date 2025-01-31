import "./normalize.css";
import "./styles.css";
import { addTask, addProject, loadFromLocalStorage, getTasks } from "./TaskController.js";
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
    closeDialogButton.addEventListener("click", (e) =>{
        e.preventDefault();
        dialog.close();
    })
    submitButton.addEventListener("click", (e) => captureTaskDetails(e));
    addTaskButton.addEventListener("click", () => dialog.showModal());

    /* Start on today tab on page load */
    renderTasks(tabs[0]);
    renderProjects();
});

const captureTaskDetails = (e) => {
    e.preventDefault();

    const taskName = document.getElementById("task-name").value;
    const taskDate = parse(document.getElementById("task-date").value, "yyyy-MM-dd", new Date());
    const taskProject = document.getElementById("task-project").value;
    const taskPriority = document.getElementById("task-priority").value;
    const taskDescription = document.getElementById("task-description").value;

    addTask(taskName, taskDescription, taskDate, taskPriority, taskProject);
    console.log(getTasks());

    const currentMode = tabs.find(t => t.id === document.querySelector(".active").id) || tabs[0];
    console.log(`Current mode: ${currentMode.id}`);
    renderTasks(currentMode);
    dialog.close();
}