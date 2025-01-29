export class Project {
    constructor(name, tasks=[]){
        this.name = name;
        this.id = name;
        this.projectTasks = tasks;
    }

    set name(newName){
        this._name = newName;
    }
    get name(){
        return this._name;
    }

    set id(name){
        this._id = name.toLowerCase().replaceAll(" ", "-");
    }
    get id(){
        return this._id;
    }

    addProjectTask = function(task){
        this.projectTasks.push(task.id);
    }
    getProjectTasks = function(){
        return this.projectTasks;
    }
}