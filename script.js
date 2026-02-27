const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const itemsLeftSpan = document.getElementById('items-left');
let tasks = [];

/*ЗАГРУЗКА ЗАДАЧ*/
const saved = localStorage.getItem('my_todo_app');
if (saved) {
    tasks = JSON.parse(saved);
} else {
    tasks = [
        { id: 1, text: 'Сделать зарядку', completed: false },
        { id: 2, text: 'Сделать Todo веб-приложение', completed: true },
        { id: 3, text: 'Приготовить обед', completed: false }
    ];
}

/*ПОКАЗАТЬ ВСЕ ЗАДАЧИ*/
function showTasks() {
    let html = '';
    for (let task of tasks) {
        const checked = task.completed ? 'checked' : '';
        const textClass = task.completed ? 'todo-text completed' : 'todo-text';
        
        html += `
            <li class="todo-item" data-id="${task.id}">
                <input type="checkbox" class="todo-checkbox" ${checked}>
                <span class="${textClass}">${task.text}</span>
                <button class="delete-btn" title="Удалить">✕</button>
            </li>
        `;
    }
    todoList.innerHTML = html;
    
    /*СЧЁТЧИК НЕВЫПОЛНЕННЫХ ЗАДАЧ*/
    let leftCount = 0;
    for (let task of tasks) {
        if (!task.completed) leftCount++;
    }
    
    /*склонение *задач*/
    let word = 'задач';
    if (leftCount === 1) word = 'задача';
    if (leftCount >= 2 && leftCount <= 4) word = 'задачи';
    itemsLeftSpan.textContent = `${leftCount} ${word}`;
    
    /*СОХРАНЕНИЕ ЗАДАЧ*/
    localStorage.setItem('my_todo_app', JSON.stringify(tasks));
}

/*ДОБАВИТЬ ЗАДАЧУ*/
document.getElementById('add-btn').onclick = () => {
    const text = todoInput.value.trim();
    if (text === '') {
        alert('Введите текст задачи');
        return;
    }
    
    tasks.push({
        id: Date.now() + Math.floor(Math.random() * 1000),
        text: text,
        completed: false
    });
    
    todoInput.value = '';
    showTasks();
};

/*ДОБАВИТЬ КНОПКОЙ ENTER*/
todoInput.onkeypress = (e) => {
    if (e.key === 'Enter') {
        document.getElementById('add-btn').click();
    }
};

/*КЛИК ПО СПИСКУ(ЧЕКБОКС И УДАЛИТЬ)*/
todoList.onclick = (e) => {
    const taskElement = e.target.closest('.todo-item');
    if (!taskElement) return;
    
    const taskId = Number(taskElement.dataset.id);
    
    /*НАХОЖДЕНИЕ ЗАДАЧИ В МАССИВЕ*/
    let foundTask = null;
    for (let task of tasks) {
        if (task.id === taskId) {
            foundTask = task;
            break;
        }
    }
    if (!foundTask) return;
    
    /*КЛИК ПО ЧЕКБОКСУ*/
    if (e.target.classList.contains('todo-checkbox')) {
        foundTask.completed = e.target.checked;
        showTasks();
    }
    
    /*КЛИК НА УДАЛИТЬ*/
    if (e.target.classList.contains('delete-btn')) {
        const newTasks = [];
        for (let task of tasks) {
            if (task.id !== taskId) {
                newTasks.push(task);
            }
        }
        tasks = newTasks;
        showTasks();
    }
};

/*ОЧИСТИТЬ ВСЁ*/
document.getElementById('clear-all-btn').onclick = () => {
    if (tasks.length === 0) return;
    
    if (confirm('Удалить все задачи?')) {
        tasks = [];
        showTasks();
    }
};

/*СТАРТ*/
showTasks();