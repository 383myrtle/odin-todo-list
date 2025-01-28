import { Task } from "./Task.js";

const tasks = [];

const addTask = (name, description, dueDate, priority, project="Default") => {
    tasks.push(new Task(name, description, dueDate, priority, project="Default"));
    saveToLocalStorage();
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveToLocalStorage();
}

const getTasks = () => {
    return tasks;
}

const saveToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadFromLocalStorage = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        tasks.length = 0; // Clear array without changing reference
        storedTasks.forEach(task => tasks.push(Object.assign(new Task(), task)));
    }
};

export { getTasks, addTask, deleteTask, loadFromLocalStorage };