import { Component, OnInit ,Injectable } from '@angular/core';
import { TodoStore, Todo } from '../services/store';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Constants } from '../services/constants';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations: [
        trigger('slideIn', [
            transition(':enter', [
                style({ transform: 'translateY(900px)' }),
                animate('200ms ease-in', style({ transform: 'translateY(0)' }))
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ transform: 'translateY(1000px)' }))
            ])
        ]),
        trigger('fade', [

            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(30px)' }),
                animate(200, style({ opacity: 1, transform: 'translateY(0px)' }))
            ]),

            transition(':leave', [
                animate(200, style({ opacity: 0, transform: 'translateY(30px)' }))
            ]),

        ])
    ]
})
@Injectable()
export class TodoComponent implements OnInit {

    newTodoText = '';
    isCompleted: Boolean;
    
	constructor(public todoStore: TodoStore,public constant: Constants) {
	    this.todoStore = todoStore;
	    this.constant = constant;
	}

	ngOnInit() {
	}

    removeCompleted(todoComponent) {
        this.todoStore.removeCompleted();
    }

    toggleCompletion(todo: Todo, todoComponent) {
        this.todoStore.toggleCompletion(todo);
    }

    remove(todo: Todo, todoStatus){
        this.todoStore.remove(todo);
    }

    addTodo(todoStatus) {
	   if(this.newTodoText.trim().length === 0 ) {
	       alert('Please enter new to do task 1');
       } else {
            this.todoStore.add(this.newTodoText);
            this.newTodoText = '';
        }
    }

}
