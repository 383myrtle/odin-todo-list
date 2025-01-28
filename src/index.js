import "./normalize.css";
import "./styles.css";
import { addTask } from "./TaskController.js";
import { render } from "./DisplayController.js";

addTask("Do dishes", "With soap", new Date(2025, 0, 27), "high");
addTask("Feed cat", "With soap", new Date(2025, 0, 27), "high");
addTask("Walk fish", "With soap", new Date(2025, 0, 28), "high");


const tabs = [
    {id: "today", name: "Today", evaluate: (task) =>{
        const today = new Date(Date.now());
        return (task.dueDate.toDateString() === today.toDateString()) ? true : false;
    }},
    {id: "upcoming", name: "Upcoming"},
    {id: "completed", name: "Completed"},
];

tabs.forEach((mode) => {
    const tab = document.getElementById(mode.id);
    tab.addEventListener("click", () => {
        render(mode);
    });
});