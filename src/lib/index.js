import { Todo } from './todo.js';


window.addEventListener('load', listTodos);

function listTodos() {

	const todoList = document.getElementById('todoList');

	Todo.getAll()
		.then((todos) => {
			const nodes = todos.forEach((todo) => {
				const node = buildDOMElement(todo);
				todoList.prepend(node);

				editInPlace(node.querySelector('h2'), todo);
			})
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