import { Component, inject, OnInit, signal } from '@angular/core';
import { Todo } from '../models/todo.type';
import { TodoService } from '../services/todo.service';
import { catchError } from 'rxjs';
import { TodoResponse } from '../models/todo-response.model';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos.pipe';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoItemComponent, FormsModule, FilterTodosPipe],
  template: `
    <h3>Todo List</h3>
    
    @if (isLoading()) {
      <p>Loading ...</p>
    }

    <label style="margin-right: 0.5rem">Filter Todo</label>
    <input
      [(ngModel)]="searchTerm"
      type="text"
      placeholder="Search todos...."
    >

    <ul class="todos">
      @for (todo of todoItems() | filterTodos : searchTerm(); track todo.uuid ) {
        <app-todo-item
          (todoToggled)="updateTodoStatus($event)"
          (todoUpdated)="updateTodo($event)"
          [todo]="todo"
        />
      }
    </ul>

    <input
        type="text"
        placeholder="Add new task..."
        [value]="newTodoTitle"
        (input)="onInputChange($event)"
        (keyup.enter)="createTodo()"
      />
    <button (click)="createTodo()">Create Task</button>
  `,
  styles: [
    `
      .todos {
        list-style: none;
      }

      input[type="text"] {
        padding: 0.7rem;
        margin-bottom: 0.7rem;
        border-radius: 0.5rem;
        border: 1px solid #ccc;
        font-size: 1rem;
        box-sizing: border-box;
        transition: border-color 0.3s;
      }

      button {
        margin-left: 0.5rem;
        padding: 0.7rem 1.2rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
      }
    `
  ]
})
export class TodoComponent implements OnInit {
  todoService = inject(TodoService);
  todoItems = signal<Array<Todo>>([]);
  isLoading = signal<boolean>(false);

  newTodoTitle: string = '';
  searchTerm = signal('');

  ngOnInit(): void {
    this.isLoading.set(true);
    this.todoService
      .getTodosIndex()
      .pipe(
        catchError((err) => {
          console.error(err);
          this.isLoading.set(false);
          throw err;
        })
      )
      .subscribe((response: TodoResponse) => {
        this.isLoading.set(false);
        if (response.success) {
          const todos = Array.isArray(response.data) ? response.data : [response.data];
          this.todoItems.set(Todo.fromApiList(todos));
        } else {
          console.error('Failed to load todos');
        }
      });
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.newTodoTitle = inputElement.value;
  }

  createTodo() {
    this.todoService.createTodo(this.newTodoTitle)
      .pipe(
        catchError((err) => {
          console.error('Failed to create todo', err);
          throw err;
        })
      )
      .subscribe((response: TodoResponse | null) => {
        if (response && response.success && response.data) {
          const createdTodo = Todo.fromApi(response.data);

          const updatedTodos = [createdTodo, ...this.todoItems()];
          this.todoItems.set(updatedTodos);

          this.newTodoTitle = '';
        }
      });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo)
      .pipe(
        catchError((err) => {
          console.error('Failed to update todo', err);
          throw err;
        })
      )
      .subscribe((response: TodoResponse) => {
        if (response.success && response.data) {
          let updatedTodoData = Todo.fromApi(response.data);

          const updatedTodos = this.todoItems().map(existingTodo  =>
            existingTodo .uuid === updatedTodoData.uuid ? { ...existingTodo , ...updatedTodoData } : existingTodo
          );

          this.todoItems.set(updatedTodos);
        }
      });
  }

  updateTodoStatus(todo: Todo) {
    this.todoService.updateTodoStatus(todo)
      .pipe(
        catchError((err) => {
          console.error('Failed to update the status of todo', err);
          throw err;
        })
      )
      .subscribe((response: TodoResponse) => {
        if (response.success && response.data) {
          let updatedTodoData = Todo.fromApi(response.data);

          const updatedTodos = this.todoItems().map(existingTodo  =>
            existingTodo .uuid === updatedTodoData.uuid ? { ...existingTodo , ...updatedTodoData } : existingTodo
          );

          this.todoItems.set(updatedTodos);
        }
      });
  }
}
