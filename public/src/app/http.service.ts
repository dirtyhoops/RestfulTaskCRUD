import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getTasks(){
    return this._http.get('/tasks');
  }

  deleteTask(id){
    return this._http.delete(`/task/${id}`);
  }

  addTask(newtask){
    return this._http.post('/task', newtask);
  }

  selectTask(id){
    return this._http.get(`/task/${id}`);
  }

  updateTask(editTask){
    return this._http.put(`/task/${editTask._id}`, editTask);
  }
}
