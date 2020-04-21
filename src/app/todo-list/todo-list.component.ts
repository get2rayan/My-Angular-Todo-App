import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/todo/todo-service';
import { MockTodoService } from 'src/app/todo/mock-todo-service';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  providers: [MockTodoService, TodoService]
})
export class TodoListComponent implements OnInit {
  private _todos: any[];
  todoServiceSubscription: Subscription;
  public newItem;
  _todoObserver: BehaviorSubject<Todo[]>;
  public path:string;

  constructor(private _todoService: MockTodoService, private route: ActivatedRoute){
    this._todos= new Array<Todo>();   
    this._todoObserver = new BehaviorSubject(this._todos); 
  }
  ngOnInit(): void {
    this.route.params.subscribe(params=>
      {
        this.path=params['status']
        this.getTodos();
      }    
    );
  }

  private getTodos(){
    //this.todoServiceSubscription= 
        /*this._todoService.getTodos()
            .subscribe(
              (data)=> {
                        console.log('data changed...'); 
                        this._todos.length=0;
                        this._todos.push(...data)
                       },
              (error)=> console.log(error),
              ()=> console.log('subscription completed')
            )
            .unsubscribe();
            */
           this._todoService.getTodos(this.path).then((res)=>{
             //empty todos array to pull fresh data each time
              this._todos.length=0;
              this._todos.push(...res)              
           })
  }
  
  get Todos(){
    return this._todos;
  }

  addTodo(){
    this._todoService.addTodo(
      {item: this.newItem, complete:false}
      )
      .then(()=>this.getTodos())
      .then(()=>this.newItem='')        
  }
  ngOnDestroy(){
    this.todoServiceSubscription.unsubscribe();
  }

  get ActiveTodos(){
    return this.Todos.filter(todo=>!todo.complete);
  }
  
  updateTodo(updateContext:any){
    this._todoService.updateTodo(updateContext.todo, updateContext.updateItem)
            .then(()=> this.getTodos());
  }
  async removeTodo(todo:Todo){
    await this._todoService.deleteTodo(todo)
              .then(()=> this.getTodos());    
  }
  clearCompletedTasks(){
    this._todoService.deleteCompletedTodos()
             .then(()=> this.getTodos());
  }
  toggleTodo(todo: Todo){
    this._todoService.toggleTodo(todo)
            .then(()=> this.getTodos());
  }
}
