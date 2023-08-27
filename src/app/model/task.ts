export class Task {
    $id: string;
    task_name: string;
    isCompleted: boolean;

    constructor(id: string, task_name: string, isComplete: boolean) {
        this.$id = id;
        this.task_name = task_name;
        this.isCompleted = isComplete;
    }
}
