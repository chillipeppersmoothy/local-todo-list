import { Injectable } from '@angular/core';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor() {}

  setLocalStoreage(name:string, TaskValue:Array<Task>): void {
    localStorage.setItem(name, JSON.stringify(TaskValue));
  }

  getLocalStoreage(name:string) {
    return localStorage.getItem(name);
  }
}
