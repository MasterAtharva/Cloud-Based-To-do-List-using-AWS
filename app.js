import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const { API, Auth } = Amplify;

document.getElementById('addTaskButton').addEventListener('click', async () => {
    const taskInput = document.getElementById('taskInput');
    const taskDescription = taskInput.value;

    if (taskDescription) {
        try {
            await API.post('apiName', '/tasks', {
                body: { taskDescription }
            });
            taskInput.value = '';
            loadTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }
});

async function loadTasks() {
    try {
        const tasks = await API.get('apiName', '/tasks');
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.taskDescription;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

loadTasks();
