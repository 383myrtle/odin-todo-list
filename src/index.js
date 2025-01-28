import "./normalize.css";
import "./styles.css";
import { addTask } from "./TaskController.js";
import { render } from "./DisplayController.js";
import { isToday, isFuture } from "date-fns";

addTask("Feed cat", "With soap", new Date(2025, 0, 28), 2);
addTask("Do dishes", "With soap", new Date(2025, 0, 29), 2);
addTask("Walk fish", "With soap", new Date(2025, 0, 28), 2);


const tabs = [
    {id: "today", name: "Today", evaluate: (task) =>{
        return (isToday(task.dueDate)) ? true : false;
    }},
    {id: "upcoming", name: "Upcoming", evaluate: (task) => {
        return (isFuture(task.dueDate)) ? true : false;
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
        render(mode);
    });
});