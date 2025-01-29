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

    set projectTasks(tasksArr){
        this._projectTasks = tasksArr;
    }
    get projectTasks(){
        return this._projectTasks;
    }

    addProjectTask = function(task){
        this.projectTasks.push(task.id);
    }

    evaluate = function(task){
        return (task.id in this.projectTasks);
    }
}