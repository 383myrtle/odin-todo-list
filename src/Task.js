export class Task {
    constructor(name, description, dueDate, priority, project="Default"){
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
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

    set project(newProject) {
        this._project = newProject;
    }
    get project() {
        return this._project;
    }
}