import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
	providedIn: 'root'
})

export class TodoStore {
	todos: Array<Todo>;

	constructor() {
		let persistedTodos = JSON.parse(localStorage.getItem('todo-app') || '[]');
		this.todos = persistedTodos.map( (todo: {_title: String, completed: Boolean}) => {
			let ret = new Todo();
			ret._title = todo._title;
			ret.completed = todo.completed;
			return ret;
		});
	}

	private updateStore() {
		localStorage.setItem('todo-app', JSON.stringify(this.todos));

	}

 	private getWithCompleted(completed: Boolean) {
		return this.todos.filter((todo: Todo) => todo.completed === completed);
	}

	getAllTodo() {
		return this.todos;
	}

	allCompleted() {
		return this.todos.length === this.getCompleted().length;
	}

	setAllTo(completed: Boolean) {
		this.todos.forEach((t: Todo) => t.completed = completed);
		this.updateStore();
	}

	removeCompleted() {
		this.todos = this.getWithCompleted(false);
		this.updateStore();
	}

	getRemaining() {
		return this.getWithCompleted(false);
	}

	getCompleted() {
		return this.getWithCompleted(true);
	}

 	toggleCompletion(todo) {
		todo.completed = !todo.completed;
		this.updateStore();
	}

	remove(todo) {
		this.todos.splice(this.todos.indexOf(todo), 1);
		this.updateStore();
	}

	add(title: String) {
		let todo = new Todo();
		todo._title = title;
		this.todos.push(todo);
		this.updateStore();
	}
}
