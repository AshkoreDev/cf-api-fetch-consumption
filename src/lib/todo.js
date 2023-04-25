import { performer } from './request.js';

export class Todo {

	constructor(args) {
		this.id = args.id;
		this.userId = args.userId;
		this.title = args.title;
		this.completed = args.completed;
	}

	static async getAll() {

		const todos = await performer({ type: 'getAll' });

		return todos.map((todo) => new Todo(todo));
	}
}