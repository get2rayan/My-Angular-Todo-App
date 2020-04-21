import { Component } from '@angular/core';
import { todoList } from '../models/mock-todoList'
import { Todo } from '../models/todo'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-todo-app';
}
