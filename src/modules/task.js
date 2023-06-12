import { deleteTask, updateTask } from './dataFunction.js';

export default class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
    // kee some data in key element
    this.element = {};
    this.element.id = `task_${Math.floor(Math.random() * 100000)}`;
    this.element.root = Task.createRoot();
    // get nodeElement from the root
    this.element.taskItemText = this.element.root.querySelector('.task_item_text');
    this.element.taskItemCheck = this.element.root.querySelector('.task_item_check');
    this.element.taskItemBtn = this.element.root.querySelector('.task_item_btn');
    this.element.taskItemBtnTrash = this.element.root.querySelector('.task_item_btn_trash');
    // set nodeElement value
    this.element.taskItemText.textContent = this.description;
    this.element.taskItemCheck.value = this.completed;
    // 3 dots menu EventListener
    this.element.taskItemBtn.addEventListener('click', () => {
      this.element.taskItemBtnTrash.classList.remove('hidden');
      this.element.taskItemBtn.classList.add('hidden');
    });
    // remove EventListener
    this.element.taskItemBtnTrash.addEventListener('click', () => {
      this.element.taskItemBtnTrash.classList.add('hidden');
      this.element.taskItemBtn.classList.remove('hidden');
      deleteTask(this.element.id);
      this.element.root.parentElement.removeChild(this.element.root);
    });
    // Update EventListener
    this.element.taskItemText.addEventListener('blur', () => {
      const newDescription = this.element.taskItemText.textContent.trim();
      this.description = newDescription;
      updateTask(this.element.id, { description: this.description });
    });
    // Checkbox EventListener
    this.element.taskItemCheck.addEventListener('change', () => {
      if (this.element.root.childNodes[1].checked) {
        updateTask(this.element.id, { completed: true });
        this.element.taskItemText.classList.add('disable');
      } else {
        updateTask(this.element.id, { completed: false });
        this.element.taskItemText.classList.remove('disable');
      }
    });
  }

    static createRoot = () => {
      const range = document.createRange();
      range.selectNode(document.body);
      return range.createContextualFragment(`
            <div class="task_item" draggable='true'>
                <input class="form-check-input task_item_check" type="checkbox" value="" id="flexCheckChecked">
                <p class="task_item_text" contenteditable>Task 1</p>
                <button class="btn  task_item_btn"><i class="bi bi-three-dots-vertical"></i></button>
                <button class="btn hidden task_item_btn_trash trash"><i class="bi bi-trash3-fill trash"></i></button>
            </div>
          `).children[0];
    }
}