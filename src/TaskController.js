import { Task } from "./Task.js";
import { Project } from "./Project.js";
import { compareAsc } from "date-fns";

const tasks = [];
const defaultProject = new Project("Default");
const projects = [defaultProject];
let counter = 0;
const priorityMap = {"high": 1, "medium": 2, "low": 3};

const addTask = (name, description, dueDate, priority, projectName) => {
    const task = new Task(name, description, dueDate, priorityMap[priority], counter);
    counter++;
    tasks.push(task);

    const projectID = projects.find(p => p.name === projectName).id;
    const project = projects.find(p => p.id === projectID);
    project.addProjectTask(task);

    saveToLocalStorage();
}

const deleteTask = (task) => {
    const thisTask = tasks.find(t => t.id === task.id);
    const index = tasks.indexOf(thisTask);
    tasks.splice(index, 1);
    saveToLocalStorage();
}

const getTasks = () => {
    return tasks;
}

const addProject = (name) => {
    const newProject = new Project(name);
    projects.push(newProject);
    saveToLocalStorage();
    return newProject;
}

const deleteProject = (index) => {
    projects[index]._projectTasks.forEach(task => deleteTask(task));
    projects.splice(index, 1);
    saveToLocalStorage();
}

const getProjects = () => {
    return projects;
}

const sort = (sortingMode) => {
    switch (sortingMode){
        case "name":
            tasks.sort((a,b) => a.name.localeCompare(b.name));
            break;
        case "priority":
            tasks.sort((a,b) => a.priority - b.priority);
            break;
        case "date":
            tasks.sort((a,b) => compareAsc(a.dueDate, b.dueDate));
    }
}

const saveToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("projects", JSON.stringify(
        projects.map(project => ({
            name: project.name,
            projectTasks: project.projectTasks.map(task => task.id)
        }))
    ));
};

const loadFromLocalStorage = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.length = 0; // Clear array without changing reference
    storedTasks.forEach(taskData => {
        const task = new Task(taskData._name, taskData._description, taskData._dueDate, taskData._priority, taskData._id);
        tasks.push(task);
    });

    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    if (storedProjects){
        projects.length = 0; // Clear array without changing reference
        storedProjects.forEach(projectData => {
            const project = new Project(
                projectData.name,
                projectData.projectTasks.map(taskId => tasks.find(t => t.id === taskId)).filter(task => task !== undefined)
            )
            projects.push(project);
        });
    }
};

export { getTasks, addTask, deleteTask, loadFromLocalStorage, getProjects, addProject, deleteProject, sort };