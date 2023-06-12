import {
  addTask, loadData, saveData,
} from './dataFunction.js';
import Task from './task.js';

const addTaskView = (task, parent) => {
  const checkValue = task.completed;
  if (checkValue) {
    task.element.taskItemCheck.setAttribute('checked', true);
  }
  parent.appendChild(task.element.root);
};

const renderTask = (parent) => {
  // 1st empty the container
  parent.innerHTML = '';
  const arrTask = loadData();
  const newArrTask = [];
  let i = 1;
  arrTask.forEach((task) => {
    task.index = i;
    const newTask = new Task(task.description, task.completed, i);
    i += 1;
    newArrTask.push(newTask);
    addTaskView(newTask, parent);
  });
  // task id changes when we renderTask()
  // to save the right id we restore localStorage
  saveData(newArrTask);
};

const populateTask = (description, parent) => {
  const arrTask = loadData();
  const index = (arrTask.length) + 1;
  const newTask = new Task(description, false, index);
  addTask(newTask);
  addTaskView(newTask, parent);
};

const checkTextContent = (content) => {
  if (content === '') {
    return 'Task Description';
  }
  return content;
};

const removeCompletedTask = () => {
  const dataTask = loadData();
  const newDataTask = dataTask.filter((task) => task.completed !== true);
  saveData(newDataTask);
};

const disableBtnAllClear = (btn) => {
  const taskData = loadData();
  if (taskData.length > 0) {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', 'disabled');
  }
};

export {
  populateTask, renderTask, checkTextContent, removeCompletedTask, disableBtnAllClear,
};