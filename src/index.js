import "./normalize.css";
import "./styles.css";
import { addTask } from "./TaskController.js";
import { render } from "./DisplayController.js";

addTask("Feed cat", "With soap", new Date(2025, 0, 28), 2);
addTask("Do dishes", "With soap", new Date(2025, 0, 29), 2);
addTask("Walk fish", "With soap", new Date(2025, 0, 28), 2);


const tabs = [
    {id: "today", name: "Today", evaluate: (task) =>{
        const today = new Date(Date.now());
        return (task.dueDate.toDateString() === today.toDateString()) ? true : false;
    }},
    {id: "upcoming", name: "Upcoming", evaluate: (task) => {
        const today = new Date(Date.now());
        today.setHours(0,0,0,0);
        const nextWeek = new Date(Date.now() + 604800000);
        nextWeek.setHours(23,59,59,999);
        return (task.dueDate <= nextWeek && task.dueDate >= today) ? true : false;
    }},
    {id: "completed", name: "Completed", evaluate: (task) => {
        return (task.isCompleted());
    }},
];

tabs.forEach((mode) => {
    const tab = document.getElementById(mode.id);
    tab.addEventListener("click", () => {
        render(mode);
    });
});