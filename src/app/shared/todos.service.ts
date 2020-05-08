import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Todo {
  id: number
  title: string
  completed: boolean
  date?: any
}

@Injectable({providedIn: 'root'})
export class TodosService {
    public todos: Todo[] = []

    constructor(private http: HttpClient) {}

    fetchTodo(): Observable<Todo[]> {
        return this.http.get<Todo[]>("https://jsonplaceholder.typicode.com/todos?_limit=5")
          .pipe(tap(todos => this.todos = todos))
    }

    onToggle(id: number) {
      const idx = this.todos.findIndex(t => t.id === id)
      this.todos[idx].completed = !this.todos[idx].completed
    }

    removeTodo(id: number) {
        // let todos = this.todos.slice()
        const updateTodos = this.todos.filter(t => t.id !== id)
        this.todos = updateTodos
        console.log(this.todos)
    }

    addTodo(todo: Todo) {
      this.todos.push(todo)
    }
}