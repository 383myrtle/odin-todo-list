export class Task {
    constructor(name, description, dueDate, priority, id){
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.id = id;
    }

    set description(newDescription) {
        this._description = newDescription;
    }
    get description() {
        return this._description;
    }

    set name(newName) {
        this._name = newName;
    }
    get name() {
        return this._name;
    }

    set priority(newPriority) {
        this._priority = newPriority;
    }
    get priority() {
        return this._priority;
    }

    set dueDate(newDueDate) {
        this._dueDate = newDueDate;
    }
    get dueDate() {
        return this._dueDate;
    }

    set id(num){
        this._id = num;
    }
    get id() {
        return this._id;
    }

    isCompleted = function() {
        return this.completed;
    }

    toggleCompleted = function() {
        this.completed = this.completed ? false : true;
    }
}