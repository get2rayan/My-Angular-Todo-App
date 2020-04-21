import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios'
import { Todo } from 'src/models/todo';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class APIService {
  axios: AxiosInstance;
  
  constructor() { 
    this.axios=axios.create({
      baseURL: environment.apiUrl,
      responseType: "json"
    })
  }

  get(){
    return this.axios.get('todos');
  }
  post(todo: Todo){
    return this.axios.post('todos', todo);
  }
  delete(todo: Todo){
    return this.axios.delete('todos', 
    { params: { item: todo.item }});
  }
  deleteCompleted(){
    return this.axios.delete('todos',
    { params: {itemStatus: 'complete'}})
  }
  toggleStatus(todo:Todo){
    return this.axios.put('todos',
    { item: todo.item})
  }
  put(todo: Todo, newVal:string){
    return this.axios.put('todos', 
    { item: todo.item, newItem: newVal })
  }
}
