const path = '/todos';
const endpoint = 'https://jsonplaceholder.typicode.com';

export function performer(action) {

	const options = {
		method: getMethod(action)
	};

	return fetch(endpoint + getPath(action), options).then((res) => res.json());
};

const getMethod = (action) => {

	switch(action.type) {
		case 'getAll':
			return 'GET';
		case 'getOne':
			return 'GET';
		case 'create':
			return 'POST';
		case 'update':
			return 'PUT';
		case 'destroy':
			return 'DELETE';
	}
};

const getPath = (action) => {

	switch(action.type) {
		case 'getAll':
			return `${path}?_limit=40`;
		case 'getOne':
			return `${path}/${action.payload.id}`;
		case 'create':
			return `${path}`;
		case 'update':
			return `${path}/${action.payload.id}`;
		case 'destroy':
			return `${path}/${action.payload.id}`;
	}
};