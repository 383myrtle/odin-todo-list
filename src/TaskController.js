import { Task } from "./Task.js";
import { Project } from "./Project.js";

const tasks = [];
const defaultProject = new Project("Default");
const projects = [defaultProject];
const counter = 0;

const addTask = (name, description, dueDate, priority, project = defaultProject) => {
    const task = new Task(name, description, dueDate, priority, counter);
    counter++;
    tasks.push(task);
    project.addProjectTask(task);
    saveToLocalStorage();
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveToLocalStorage();
}

const getTasks = () => {
    return tasks;
}

const addProject = (name) => {
    projects.push(new Project(name));
    saveToLocalStorage();
}

const deleteProject = (index) => {
    projects.splice(index, 1);
    saveToLocalStorage();
}

const getProjects = () => {
    return projects;
}

const saveToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("projects", JSON.stringify(projects));
};

const loadFromLocalStorage = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        tasks.length = 0; // Clear array without changing reference
        storedTasks.forEach(task => tasks.push(Object.assign(new Task(), task)));
    }
/*     const storedProjects = JSON.parse(localStorage.getItem("projects"));
    if (storedProjects) {
        projects.length = 0; // Clear array without changing reference
        storedProjects.forEach(project => projects.push(Object.assign(new Project(project.name, project.tasks))));
    }
 */};

export { getTasks, addTask, deleteTask, loadFromLocalStorage, getProjects, addProject, deleteProject };