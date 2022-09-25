import { Component, OnInit } from '@angular/core';
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem('taskList') || '[]');

  constructor() { }

  private sortTaskList(): void {
    this.taskList
      .sort((a, b) => Number(a.checked) - Number(b.checked));
  }

  public deleteItemTaskList(targetIndex: number): void {
    this.taskList.splice(targetIndex, 1)
  }

  public deleteAllTaskList(): void {
    const confirm = window.confirm('Press \'OK\' to delete everything');

    if (confirm)
      this.taskList = [];
  }

  public setEmitTaskList(e: string): void {
    this.taskList.push({
      task: e.toString().trim(),
      checked: false
    });
  }

  public validationInput(targetText: string, targetIndex: number): void {
    if (!targetText.length) {
      if (window.confirm('Press \'OK\' to delete this empty task'))
        this.deleteItemTaskList(targetIndex);
    }
  }

  private setTaskListIntoLocalStorage(): void {
    if (this.taskList)
      localStorage.setItem('taskList', JSON.stringify(this.taskList));
  }

  ngOnInit(): void { }

  ngDoCheck(): void {
    this.sortTaskList();
    this.setTaskListIntoLocalStorage();
  }

}
