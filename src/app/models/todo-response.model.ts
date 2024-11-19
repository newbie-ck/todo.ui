import { Todo } from './todo.type';

export interface TodoResponse {
    success: boolean;
    data: Todo | Todo[];
}