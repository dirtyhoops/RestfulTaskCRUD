import { Component,  OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  constructor(private _httpService: HttpService){}
  
  tasks = [];

  newTask: any;
  editTask: any;
  selectedTask;
  ngOnInit(){
    this.getTasks();
    this.newTask = {title: "", description: "" }
  }
  
  getTasks() {
    let observeTasks = this._httpService.getTasks();
    observeTasks.subscribe(res => {
      if(res['message'] == 'Success') {
        console.log("success, we got datas");
        this.tasks = res['data'];
      }
    })
  }

  deleteTask(id) {
    let observeTask = this._httpService.deleteTask(id);
    observeTask.subscribe(res => {
      console.log("got a response from deletetask", res);
      if(res['message']=="Success"){
        this.getTasks();
      } else {
        console.log("error deleting a task");
      }
    })
  }

  onSubmit() {
    let obs = this._httpService.addTask(this.newTask);
    obs.subscribe(data => {
      console.log("got data from POST back", data);
      this.newTask = {title: "", description: ""}
      this.getTasks();
    })
  }

  selectTask(id){
    let observeTask = this._httpService.selectTask(id);
    observeTask.subscribe(res => {
      console.log("Got a response from get one", res);
      if(res['message']=="Success"){
        this.editTask = res['data']
      }
      else {
        console.log("Error getting one task");
      }
    })
  }

  updateTask(editTask) {
    let obs = this._httpService.updateTask(editTask);
    obs.subscribe(data => {
      console.log("got data from POST back", data);
      this.editTask = null;
      this.getTasks();
    })
  }


}
