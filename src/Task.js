export class Task {
    constructor(name, description, dueDate, priority, project="Default"){
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }

    setDescription(newDescriptoin){
        this.description = newDescriptoin;
    }

    setName(newName){
        this.name = newName;
    }

    setPriority(newPriority){
        this.priority = newPriority;
    }

    setDueDate(newDueDate){
        this.dueDate = newDueDate;
    }
}