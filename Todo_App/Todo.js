const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function addTodo(e) {
    e.preventDefault();
    if (todoInput.value === '')
        return; 
    const todo = {
         id: Date.now(), 
         name: todoInput.value, 
         completed: false 
        };
    todos.push(todo);
    todoInput.value = '';
    saveTodos();
    renderTodos();
}

function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

function updateTodo(id, newName) {
    todos = todos.map(todo => todo.id === id ? { ...todo, name: newName } : todo);
    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.setAttribute('data-key', todo.id);

        const todoItemName = document.createElement('span');
        todoItemName.classList.add('todo-item-name');
        todoItemName.textContent = todo.name;

        const todoItemButtons = document.createElement('div');
        todoItemButtons.classList.add('todo-item-buttons');

        const todoItemUpdateButton = document.createElement('button');
        todoItemUpdateButton.classList.add('todo-update-button');
        todoItemUpdateButton.textContent = 'Update';
        todoItemUpdateButton.addEventListener('click', () => {
            const newName = prompt('Enter the new name of the task');
            if (newName)
                updateTodo(todo.id, newName);
        });

        const todoItemRemoveButton = document.createElement('button');
        todoItemRemoveButton.classList.add('todo-remove-button');
        todoItemRemoveButton.textContent = 'Remove';
        todoItemRemoveButton.addEventListener('click', () => removeTodo(todo.id));

        const todoCheckBox = document.createElement('input');
        todoCheckBox.type = 'CheckBox';
        todoCheckBox.id = 'todoDone'; // need unique Ids!
        todoCheckBox.classList.add('todo-CheckBox');
        // newtodoCheckBox.value = check_value[count] + '<br/>';

        todoItem.appendChild(todoCheckBox);
        todoItem.appendChild(todoItemName);
        todoItem.appendChild(todoItemButtons);
        todoItemButtons.appendChild(todoItemUpdateButton);
        todoItemButtons.appendChild(todoItemRemoveButton);
        todoList.appendChild(todoItem);
    });
}

todoForm.addEventListener('submit', addTodo); 

renderTodos();