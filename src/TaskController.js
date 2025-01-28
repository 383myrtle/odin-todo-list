import { Task } from "./Task.js";

const tasks = [];

const addTask = (name, description, dueDate, priority, project="Default") => {
    tasks.push(new Task(name, description, dueDate, priority, project="Default"));
}

const getTasks = () => {
    return tasks;
}

export { getTasks, addTask };