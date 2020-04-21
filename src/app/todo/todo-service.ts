import { Injectable } from '@angular/core';
import { Todo } from 'src/models/todo';
import { APIService } from './api.service'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[]=[];   //=new Array<Todo>();
  
  constructor(private _apiService: APIService) {    
  }

  public getTodos(path=''){
    let filterFunc:Function=(item)=>item;
    //check if active or completed items selected
    if(path=='active' || path=='completed')              
      filterFunc= path=='completed' ? item=> item.complete : item=>!item.complete; 
    
    return this._apiService.get().then(res=>
    {
      return new Promise<any>(resolve=>
        resolve(res.data.todos.filter(filterFunc)))
    })
  }
  
  ngOnDestroy(){
  }
  addTodo(todo:Todo){
    return this._apiService.post(todo)
  }
  deleteTodo(todo: Todo){
    return this._apiService.delete(todo)    
  }
  deleteCompletedTodos(){
    return this._apiService.deleteCompleted()
  }
  updateTodo(todo: Todo, newVal: string){
    return this._apiService.put(todo, newVal)
  }
  toggleTodo(todo:Todo){
    return this._apiService.toggleStatus(todo)
  }
}
