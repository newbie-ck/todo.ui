import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.type';

@Pipe({
  name: 'filterTodos',
  standalone: true
})
export class FilterTodosPipe implements PipeTransform {

  transform(todos: Todo[], searchTerm: string): Todo[] {
    if (!searchTerm) {
      return todos;
    }
    
    const text = searchTerm.toLowerCase();
    return todos.filter(todo => {
      return todo.todoTitle.toLowerCase().includes(text);
    })
  }

}
