import { Injectable } from '@angular/core';
import { Todo } from 'src/models/todo';
import { todoList } from 'src/models/mock-todoList';
import { Observable, of, Subscription, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockTodoService {
  todoObservable:Observable<Todo[]> = Observable.create(observer =>{
      observer.next(this.todos);      
      //observer.complete();
  });
  _bsubject: BehaviorSubject<Todo[]>;

  todos: any;   //=new Array<Todo>();
  
  constructor() {
    this.todos=[];    
    this.todos.push(...todoList);
    this._bsubject=new BehaviorSubject(this.todos)
    this._bsubject.subscribe(next=> console.log(next))
  }

  public getTodos(path=''){
    let filterFunc:Function=(item)=>item;
    //check if active or completed items selected
    if(path=='active' || path=='completed')              
      filterFunc= path=='completed' ? item=> item.complete : item=>!item.complete; 
    
    //return this.todoObservable;
    return new Promise<any>(resolve=>
        resolve(this.todos.filter(filterFunc)))
  }
  
  //#region Subscription 
  //subscri: Subscription;
  /*subs(){
    this.subscri=this.todoObservable.subscribe(
      item=>console.log(item),
      (error)=>console.log(error),
      ()=>console.log(' subscri completed')      
      )
  }*/
  //#endregion
  ngOnDestroy(){
    this._bsubject.unsubscribe();
    //this.subscri.unsubscribe();
  }
  addTodo(todo:Todo){
    return new Promise(resolve=>
      {
        resolve(this.todos.push(...[todo]));      
      });
  }
  deleteTodo(todo: Todo){
    return new Promise(resolve=>{
      let indexofTodo = this.todos.findIndex(item=> item.item===todo.item)
       resolve(this.todos.splice(indexofTodo, 1))
    });
  }
  deleteCompletedTodos(){
      return new Promise(resolve=>{
         resolve(this.todos= this.todos.filter(item=>item.complete===false))
      })    
  }
  updateTodo(todo: Todo, newVal: string){
      return new Promise(resolve=>{
        let indexofTodo = this.todos.findIndex(item=> item.item===todo.item)
        resolve(this.todos[indexofTodo].item=newVal)
      })    
  }
  toggleTodo(todo:Todo){
      return new Promise(resolve=>{
        let indexofTodo = this.todos.findIndex(item=> item.item===todo.item)        
        resolve(this.todos[indexofTodo].complete=!todo.complete)
      })    
  }
}
