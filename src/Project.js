import { deleteTask } from "./TaskController";

export class Project {
    constructor(name, tasks=[]){
        this.name = name;
        this._projectTasks = tasks;
    }

    set name(newName){
        this._name = newName;
        this._id = newName.toLowerCase().replaceAll(" ", "-");
    }
    get name(){
        return this._name;
    }

    get id(){
        return this._id;
    }

    get projectTasks(){
        return this._projectTasks;
    }

    addProjectTask = function(task){
        if (!this._projectTasks.some(t => t.id === task.id)) {
            this._projectTasks.push(task);
        }
    }

    removeAllTasks = function(){
        this._projectTasks.forEach(task => deleteTask(task));
    }

    evaluate = function(task){
        return this._projectTasks.some(t => t.id === task.id);
    }
}