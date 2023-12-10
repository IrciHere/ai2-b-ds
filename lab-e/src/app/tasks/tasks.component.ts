import { Component } from '@angular/core';
import {Task} from "../task";
import {TasksService} from "../tasks.service";
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task[] = [];
  newTask: Task = {};
  isProcessing: boolean = false;

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.tasksService.index().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask(){
    if (!this.newTask.title) {
      return;
    }

    this.isProcessing = true;

    this.newTask.completed = false;
    this.newTask.archived = false;

    this.tasksService.post(this.newTask).subscribe(() => {
      this.newTask = {};
      this.getTasks();
      this.isProcessing = false;
    });
  }

  handleChange(task: Task) {
    this.tasksService.put(task).subscribe({
      error: err => {
        alert(err);
        this.getTasks();
      }
    });
  }

  archiveCompleted() {
    const observables: Observable<any>[] = [];
    for (const task of this.tasks) {
      if (!task.completed) {
        continue;
      }

      task.archived = true;
      observables.push(this.tasksService.put(task));
    }

    forkJoin(observables).subscribe(() => {
      this.getTasks();
    });
  }

  canAddTask() {
    return !this.newTask.title;
  }

  canArchiveTasks() {
    return this.tasks.some(t => t.completed);
  }
}
