import { Component, input, output } from '@angular/core';
import { Todo } from '../../models/todo.type';
import { StyleCompletedTodoDirective } from '../../directives/style-completed-todo.directive';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [StyleCompletedTodoDirective],
  template: `
    <li
      appStyleCompletedTodo
      [isCompleted]="todo().isCompleted"
      class="todos__item"
    >
      <input
        id="todo-{{ todo().uuid }}"
        type="checkbox"
        [checked]="todo().isCompleted"
        (change)="this.todoClicked()"
      />
      @if (!isEditing) {
        <label (click)="startEditing()">{{ todo().todoTitle }}</label>
      } @else {
        <input
          [value]="todo().todoTitle"
          (blur)="onBlur($event)"
          (keyup.enter)="onBlur($event)"
          autofocus
        />
      }

    </li>
  `,
  styles: [
    `
      .todos__item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          padding: 12px;
          margin-bottom: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s, box-shadow 0.3s;

          input {
            cursor: pointer;
          }
      }
    `
  ]
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  todoToggled = output<Todo>();
  todoUpdated = output<Todo>();

  isEditing = false;
  newTodoTitle: string = '';

  todoClicked() {
    this.todoToggled.emit(this.todo());
  }

  startEditing() {
    this.isEditing = true;
  }

  onBlur(event: any) {
    const newTitle = event.target.value.trim();
  
    if (newTitle !== this.todo().todoTitle) {
      this.todo().todoTitle = newTitle;
      this.todoUpdated.emit(this.todo());
    }

    this.isEditing = false;
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.newTodoTitle = inputElement.value;
  }
}
