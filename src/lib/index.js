import { Todo } from './todo.js';


window.addEventListener('load', listTodos);

function listTodos() {

	const mainForm = document.getElementById('mainForm');
	const todoList = document.getElementById('todoList');

	mainForm.addEventListener('submit', (e) => {

		e.preventDefault();

		const form = e.target;
		const submitText = document.getElementById('submitText');
		const submitBtn = document.getElementById('submitBtn');
		submitBtn.disabled = true;

		const todo = new Todo({ userId: 1, title: submitText.value, completed: false });

		if(submitText.value.trim()) {

			todo.save().then(() => {

				submitText.value = '';
				submitBtn.disabled = false;

				addNode(todoList, todo);
			});	

		} else {

			alert('texto vacio');
			submitText.autofocus = true;
			submitBtn.disabled = false;
		}

		return false;
	});

	Todo.getAll()
		.then((todos) => {
			const nodes = todos.forEach((todo) => addNode(todoList, todo));
		});
};

const buildDOMElement = (todo) => {

	const li = document.createElement('li');
	const title = document.createElement('h2');
	const closeBtn = document.createElement('button');

	title.innerText = todo.title;
	closeBtn.innerText = 'X';

	closeBtn.addEventListener('click', () => {

		todo.destroy();
		li.remove();
	});

	editInPlace(title, todo);

	li.append(title, closeBtn);

	return li;
};

const editInPlace = (node, todo) => {

	const inputText = document.createElement('textarea');
	inputText.value = node.innerText;
	inputText.autofocus = true;

	node.addEventListener('click', () => node.replaceWith(inputText));

	inputText.addEventListener('change', () => {

		inputText.replaceWith(node);
		todo.title = inputText.value;
		node.innerText = todo.title;

		todo.save();
	});
};

const addNode = (todoList, todo) => {

	const node = buildDOMElement(todo);
	todoList.prepend(node);
};