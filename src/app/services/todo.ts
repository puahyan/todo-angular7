import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class Todo {
	 completed: Boolean = false;
	 _title: String ;

	constructor() {

	}
}

