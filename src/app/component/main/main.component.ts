/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';
import { v4 as uuid4 } from 'uuid';
//import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  addTaskValue:string = '';
  isEditable:boolean = false;
  taskArray:Task[] = [];
  taskObject!: Task;
  STORAGE_NAME:string = 'Todo';
  updateTaskID:string = '';
  changeName:string = 'Add';

  ngOnInit(): void {
    this.getTasks()
    this.isEditable?this.changeName='Update':this.changeName='Add';
  }

  onClick(): void {
    this.isEditable?this.updateTask():this.addTask()
  }

  constructor(private storage:CrudService) {}

  getTasks():any {
    const value:any = this.storage.getLocalStoreage(this.STORAGE_NAME);
    if(value != null && value.length > 0 && value != undefined) {
      this.taskArray = JSON.parse(value);
    }
  }

  addTask():void {

    if(this.addTaskValue === null || this.addTaskValue === '') {
      return alert('Please add a task');
    }

    this.taskObject = new Task(uuid4(),this.addTaskValue,false);
    this.taskArray.push(this.taskObject);
    this.storage.setLocalStoreage(this.STORAGE_NAME,this.taskArray);
    this.ngOnInit();
    this.addTaskValue = '';
  }

  editTask(task:Task):void {
    this.addTaskValue = task.task_name;
    this.updateTaskID = task.$id;
    this.isEditable = true;
    this.ngOnInit();
  }

  updateTask() {
    this.taskObject = new Task(this.updateTaskID,this.addTaskValue,false);
    const isPresent:any = this.taskArray.map(task => task.$id === this.taskObject.$id? this.taskObject : task);
    this.storage.setLocalStoreage(this.STORAGE_NAME,isPresent);
    this.addTaskValue = '';
    this.updateTaskID = '';
    this.ngOnInit();
  }

  deleteTask(taskItem: Task) {
    const restTask = this.taskArray.filter(task => task.$id != taskItem.$id)
    this.storage.setLocalStoreage(this.STORAGE_NAME,restTask);
    this.ngOnInit();
  }

  isCompletedTask(taskItem: Task): void {
    this.taskObject = new Task(taskItem.$id,taskItem.task_name,true);
    const isPresent = this.taskArray.map(task => task.$id === this.taskObject.$id?this.taskObject:task);
    this.storage.setLocalStoreage(this.STORAGE_NAME,isPresent);
    this.ngOnInit();
  }

}
