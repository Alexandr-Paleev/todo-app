import { TodosService } from './../shared/todos.service';
import { Component, OnInit} from '@angular/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  private loading: boolean = true
  private searchString = ""

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.todosService.fetchTodo()
      .pipe(delay(2000))
      .subscribe(() => {
        this.loading = false
      })
  }

  onChange(id: number) {
    this.todosService.onToggle(id)
  }

  removeTodo(id: number) {
    this.todosService.removeTodo(id)
  }
}
