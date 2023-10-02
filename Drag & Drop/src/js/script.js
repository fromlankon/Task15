let form = document.querySelector('.top');
let input = document.querySelector('.taskInput');
let boardMain = document.getElementById('boardMain');
let addButton = document.querySelector('.addButton')
let deleteButton = document.querySelector('.deleteButton');
let board = document.querySelectorAll('.board');
let alertText = document.querySelector('.alertText');
let deleteRow = document.querySelectorAll('.deleteRow');
let task = document.querySelectorAll('.task');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let value = input.value;
  if (!value) return;
  let addTask = document.createElement('p');
  addTask.classList.add('task');
  addTask.setAttribute('draggable', 'true');
  addTask.innerText = value;
  let span = document.createElement('span');
  span.innerHTML = "+";
  addTask.appendChild(span);
  span.title = "delete";

  span.addEventListener('click', () => {
    addTask.remove();
  });
  
  addTask.addEventListener('dragstart', () => {
    addTask.classList.add('stylize');
  });

  addTask.addEventListener('dragend', () => {
    addTask.classList.remove('stylize');
  });

  boardMain.appendChild(addTask);
  input.value = "";
});

deleteButton.addEventListener('click', () => {
  board.forEach(element => {
    element.innerHTML = "";
  });
});

addButton.addEventListener('click', () => {
  if(input.value == ""){
    alertText.classList.add("active")
  }
})

input.addEventListener('input', () => {
  if(input.value !== ""){
    alertText.classList.remove("active");
}
})

deleteRow.forEach((deleteRow, index) => {
  deleteRow.addEventListener('click', () => {
    task[index].remove();
  });
});



let boardDrag = document.querySelectorAll('.task');
let boardDrop = document.querySelectorAll('.board');

boardDrag.forEach((task) => {
  task.addEventListener('dragstart', () => {
    task.classList.add('stylize');
  });
  task.addEventListener('dragend', () => {
    task.classList.remove('stylize');
  });
});

boardDrop.forEach((obj) => {
  obj.addEventListener('dragover', (e) => {
    e.preventDefault();

    let bottomTask = insertAboveTask(obj, e.clientY);
    let curTask = document.querySelector(".stylize");

    if (!bottomTask) {
      obj.appendChild(curTask);
    } else {
      obj.insertBefore(curTask, bottomTask);
    }
  });
});

let insertAboveTask = (obj, mouseY) => {
  let els = obj.querySelectorAll(".task:not(.stylize)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    let {top} = task.getBoundingClientRect();

    let offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};