var tasks = [];

function getDateTime() {
    var now = new Date();
    return now.toLocaleString();
}

function renderTasks() {
    var pendingList = document.getElementById('pendingList');
    var completedList = document.getElementById('completedList');

    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    var pendingTasks = [];
    var completedTasks = [];

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].completed) {
            completedTasks.push(tasks[i]);
        } else {
            pendingTasks.push(tasks[i]);
        }
    }

    if (pendingTasks.length === 0) {
        pendingList.innerHTML = '<p class="empty-msg">No pending tasks 🎉</p>';
    } else {
        for (var i = 0; i < pendingTasks.length; i++) {
            pendingList.appendChild(createTaskItem(pendingTasks[i]));
        }
    }

    if (completedTasks.length === 0) {
        completedList.innerHTML = '<p class="empty-msg">No completed tasks yet.</p>';
    } else {
        for (var i = 0; i < completedTasks.length; i++) {
            completedList.appendChild(createTaskItem(completedTasks[i]));
        }
    }
}

function createTaskItem(task) {
    var li = document.createElement('li');

    var taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';

    var taskText = document.createElement('span');
    taskText.className = task.completed ? 'task-text done' : 'task-text';
    taskText.textContent = task.text;

    var taskDate = document.createElement('span');
    taskDate.className = 'task-date';
    taskDate.textContent = 'Added: ' + task.addedAt;

    taskInfo.appendChild(taskText);
    taskInfo.appendChild(taskDate);

    if (task.completedAt) {
        var completedDate = document.createElement('span');
        completedDate.className = 'task-date';
        completedDate.textContent = 'Completed: ' + task.completedAt;
        taskInfo.appendChild(completedDate);
    }

    var taskButtons = document.createElement('div');
    taskButtons.className = 'task-buttons';

    if (!task.completed) {
        var completeBtn = document.createElement('button');
        completeBtn.className = 'btn-complete';
        completeBtn.textContent = '✔ Done';
        completeBtn.setAttribute('data-id', task.id);
        completeBtn.onclick = function() {
            completeTask(parseInt(this.getAttribute('data-id')));
        };
        taskButtons.appendChild(completeBtn);

        var editBtn = document.createElement('button');
        editBtn.className = 'btn-edit';
        editBtn.textContent = '✏ Edit';
        editBtn.setAttribute('data-id', task.id);
        editBtn.onclick = function() {
            editTask(parseInt(this.getAttribute('data-id')));
        };
        taskButtons.appendChild(editBtn);
    }

    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = '🗑 Delete';
    deleteBtn.setAttribute('data-id', task.id);
    deleteBtn.onclick = function() {
        deleteTask(parseInt(this.getAttribute('data-id')));
    };
    taskButtons.appendChild(deleteBtn);

    li.appendChild(taskInfo);
    li.appendChild(taskButtons);

    return li;
}

function addTask() {
    var taskInput = document.getElementById('taskInput');
    var text = taskInput.value.trim();

    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    var newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        addedAt: getDateTime(),
        completedAt: null
    };

    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
}

function completeTask(id) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].completed = true;
            tasks[i].completedAt = getDateTime();
            break;
        }
    }
    renderTasks();
}

function editTask(id) {
    var task = null;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            task = tasks[i];
            break;
        }
    }

    if (!task) return;

    var newText = prompt('Edit your task:', task.text);
    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        renderTasks();
    }
}

function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        var newTasks = [];
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id !== id) {
                newTasks.push(tasks[i]);
            }
        }
        tasks = newTasks;
        renderTasks();
    }
}

// Event Listeners - wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    var addTaskBtn = document.getElementById('addTaskBtn');
    var taskInput = document.getElementById('taskInput');

    addTaskBtn.addEventListener('click', function() {
        addTask();
    });

    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});