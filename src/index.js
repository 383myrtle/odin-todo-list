import "./normalize.css";
import "./styles.css";
import { addTask, addProject, loadFromLocalStorage, getTasks } from "./TaskController.js";
import { renderTasks, renderProjects } from "./DisplayController.js";
import { isToday, isFuture, parse } from "date-fns";

document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    console.log(getTasks());

    const tabs = [
        {id: "today", name: "Today", evaluate: (task) =>{
            return (isToday(task.dueDate) && !task.isCompleted()) ? true : false;
        }},
        {id: "upcoming", name: "Upcoming", evaluate: (task) => {
            return (isFuture(task.dueDate) && !task.isCompleted()) ? true : false;
        }},
        {id: "completed", name: "Completed", evaluate: (task) => {
            return (task.isCompleted());
        }},
    ];
    
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
    const dialog = document.getElementById("add-task-dialog");
    addTaskButton.addEventListener("click", () => {
        dialog.showModal();
    });

    /* Start on today tab on page load */
    renderTasks(tabs[0]);
    renderProjects();
});
