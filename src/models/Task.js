export class Task {
    constructor(id = null, title = '', description = '', createdDate = new Date(), completed = false, priorityLevel = 1) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
        this.completed = completed;
        this.priorityLevel = priorityLevel;
    }

    static fromJson(json) {
        return new Task(
            json.id,
            json.title,
            json.description,
            new Date(json.createdDate),
            json.completed,
            json.priorityLevel
        );
    }

    toJson() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            createdDate: this.createdDate.toISOString(),
            completed: this.completed,
            priorityLevel: this.priorityLevel
        };
    }
}
