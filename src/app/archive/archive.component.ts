import { Component } from '@angular/core';
import {Task} from "../task";
import {TasksService} from "../tasks.service";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent {
  tasks: Task[] = [];

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.tasksService.index(true).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(task: Task) {
    if (!confirm(`Do you really want to delete the task '${task.title}'?`)) {
      return;
    }

    this.tasksService.delete(task).subscribe(() => {
      this.getTasks();
    });
  }
}
