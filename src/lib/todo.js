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

	save = async () => {

		(this.id) ? this.update() : this.create();
	}

	create = async () => {

		const todoCreated = await performer({
			type: 'create',
			payload: {
				userId: this.userId,
				title: this.title,
				completed: this.completed
			}
		}).then((res) => this.id = res.id);

		return todoCreated;
	}

	update = async () => {

		const todoUpdated = await performer({
			type: 'update',
			payload: {
				id: this.id,
				title: this.title
			}
		});

		return todoUpdated;
	}

	destroy = async () => {

		const todoDeleted = await performer({
			type: 'destroy',
			payload: {
				id: this.id
			}
		});

		return todoDeleted;
	}
}