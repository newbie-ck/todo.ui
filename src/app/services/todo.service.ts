import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.type';
import { TodoResponse } from '../models/todo-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  http = inject(HttpClient);
  private apiUrl: string = environment.todoApiUrl;

  getTodosIndex(): Observable<TodoResponse> {
    return this.http.get<TodoResponse>(this.apiUrl);
  }

  createTodo(todoTitle: string): Observable<TodoResponse> {
    return this.http.post<TodoResponse>(this.apiUrl, {
      todo_title: todoTitle
    });
  }

  updateTodo(todo: Todo): Observable<TodoResponse> {
    return this.http.put<TodoResponse>(`${this.apiUrl}/${todo.uuid}`, {
      todo_title: todo.todoTitle
    });
  }

  updateTodoStatus(todo: Todo): Observable<TodoResponse> {
    return this.http.patch<TodoResponse>(`${this.apiUrl}/${todo.uuid}/status`, {
      is_completed: !todo.isCompleted
    });
  }
}
