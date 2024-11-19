export type Todo = {
    uuid: string;
    todoTitle: string;   
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export namespace Todo {
    export function fromApi(apiTodo: any): Todo {
        return {
            uuid: apiTodo.uuid,
            todoTitle: apiTodo.todo_title,
            isCompleted: apiTodo.is_completed,
            createdAt: new Date(apiTodo.created_at),
            updatedAt: new Date(apiTodo.updated_at)
        };
    }
    export function fromApiList(apiTodos: any[]): Todo[] {
        return apiTodos.map(fromApi);
    }
}