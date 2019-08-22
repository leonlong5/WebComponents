let taskInput = document.getElementById('new-task');
let addButton = document.getElementsByTagName('button')[0];
let incompleteTasksHolder = document.getElementById('incomplete-tasks');
let completedTasksHolder = document.getElementById('completed-tasks');


//-----------------------------add todo ----------------------------------//
//create New task List Item
let createNewTaskElement = function(taskString) {
  let listItem = document.createElement('li');   //Create List Item
  let checkBox = document.createElement('input');  //input (checkbox)
  let label = document.createElement('label');  //label
  let editInput = document.createElement('input');  //edit input
  let editButton = document.createElement('button');  //button.edit
  let deleteButton = document.createElement('button');  //button.delete

  //set attributes, text className for each node
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';
  label.innerText = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

let addTask = function() {
  let listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  taskInput.value = '';
}

addButton.addEventListener("click", addTask);



//-----------------------------bind events to new added todo item ----------------------------------//

var editTask = function () {
  var listItem = this.parentNode;

  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');
  console.log(listItem)
  //we give li tag a editMode calssName if it is edit mode
  var containsClass = listItem.classList.contains('editMode');

  if (containsClass) {
    //switch from .editMode, Make label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode, input value becomes the label's text
    editInput.value = label.innerText;
  }

  //toggle editmode
  listItem.classList.toggle('editMode');
}

var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

// Mark a task as complete
var taskCompleted = function() {
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete) // bind listItem with incomplete callback
}

// Mark a task as incomplete
var taskIncomplete = function() {
  //when checkbox is uncheched, append the list to incomplete
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  //bind editTask to edit button
  editButton.onclick = editTask;

  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;

  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}


// Cycle over the incompleteTaskHolder ul list items
for(var i = 0; i <  incompleteTasksHolder.children.length; i++) {
    // bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
// Cycle over the completeTaskHolder ul list items
for(var i = 0; i <  completedTasksHolder.children.length; i++) {
    // bind events to list item's children (taskIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);

}
