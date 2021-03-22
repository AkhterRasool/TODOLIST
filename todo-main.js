const itemDescField = document.getElementById("todo-item");
const addButton = document.getElementById("add-todo-item");
const activeViewTable = document.getElementById("todo-view-table");
const completedViewTable = document.getElementById("completed-todo-view-table");
const form = document.getElementById("controls");

addButton.addEventListener("click", addItemToList);
class TodoList {
    constructor() {
        this.set = new Set();
        this.completedItemsSet = new Set();
    }

    addItem(todoItem) {
        todoItem = todoItem.trim();
        if (this.set.has(todoItem)) {
            alert("You have already added that!");
        } else if (todoItem.length == 0) {
            alert("Empty items are not valid.");
        } else {
            this.set.add(todoItem);
            let html = activeViewTable.innerHTML;
            html += `<tr>
                        <td>${this.set.size}</td>
                        <td>${todoItem}</td>
                        <td><button class='done-todo-item action-buttons'>Done</button><button class='delete-todo-item action-buttons'>Delete</button></td>
                    </tr>`;
            activeViewTable.innerHTML = html;
            enableDeleteFunctionality();
            enableDoneFunctionality();
        }
    }

    removeItem(todoItem) {
        if (this.set.has(todoItem)) {
            this.set.delete(todoItem);
            updateActiveTable(this.set);
        }
    }

    markItemAsCompleted(todoItem) {
        if (this.set.has(todoItem)) {
            this.set.delete(todoItem);
            this.completedItemsSet.add(todoItem);
            updateActiveTable(this.set);
            updateCompletedTable(this.completedItemsSet);
        }
    }
}

let todoList = new TodoList();


function addItemToList() {
    const itemDesc = itemDescField.value;
    todoList.addItem(itemDesc);
    itemDescField.value = '';
}

function updateActiveTable(set) {
    let count = 1;
    let html = "";
    set.forEach(item => {
        html += `<tr>
                    <td>${count}</td>
                    <td>${item}</td>
                    <td><button class='done-todo-item action-buttons'>Done</button><button class='delete-todo-item action-buttons'>Delete</button></td>
                </tr>`;
        count++;        
    });
    activeViewTable.innerHTML = html;
    enableDeleteFunctionality();
    enableDoneFunctionality();
}

function enableDeleteFunctionality() {
    let deleteButtons = document.getElementsByClassName("delete-todo-item");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", () => {
            const todoDesc = deleteButtons[i].parentElement.previousElementSibling.innerHTML;
            todoList.removeItem(todoDesc);
        })
    }
}

function enableDoneFunctionality() {
    let doneButtons = document.getElementsByClassName("done-todo-item");
    for (let i = 0; i < doneButtons.length; i++) {
        doneButtons[i].addEventListener("click", () => {
            const todoDesc = doneButtons[i].parentElement.previousElementSibling.innerHTML;
            todoList.markItemAsCompleted(todoDesc);
        })
    } 
}


function updateCompletedTable(completedItemsSet) {
    let count = 1;
    let html = "";
    completedItemsSet.forEach(item => {
        html += `<tr>
                    <td>${count}</td>
                    <td>${item}</td>
                </tr>`;
        count++;        
    });
    completedViewTable.innerHTML = html;
}