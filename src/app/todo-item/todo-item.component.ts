import { Component, OnInit, Input, Output } from '@angular/core';
import { Todo } from 'src/models/todo';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {

  @Input() todo: Todo;
  @Input() index: number;
  @Input() onDelete: (item: Todo)=>void;
 @Input() ToggleTodo: (item: Todo)=>void;

  @Output() onChildUpdateClick: EventEmitter<any> = new EventEmitter();
  
  editMode: boolean=false;
  
  constructor() { }

  updateClick(newVal: string) {
    /** Trigger event as event emitted from child */
    this.onChildUpdateClick.emit({todo: this.todo, updateItem: newVal})
  }
  deleteClick(){
    /** Invoke delete method as passed down by parent */
    this.onDelete(this.todo);
  }  
}
