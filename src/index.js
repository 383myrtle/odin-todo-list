import "./normalize.css";
import "./styles.css";
import { addTask, loadFromLocalStorage } from "./TaskController.js";
import { renderTasks, renderProjects } from "./DisplayController.js";
import { isToday, isFuture } from "date-fns";

document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();

/*     let input = prompt("Enter a task:");
    while (input !== "q"){
        let desc = prompt("Enter a description:");
        addTask(input, desc, new Date(Date.now()), 1);
        console.log("Task added successfully");
        input = prompt("Enter a task:")
    }
 */
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
            currentTab.classList.remove("active");
            tab.classList.add("active");    
            renderTasks(mode);
        });
    });

    /* Start on today tab on page load */
    renderTasks(tabs[0]);
    renderProjects();
})
