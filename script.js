const addBtn = document.querySelector('.addBtn');
const toDoDisplay = document.querySelector('.todo-list');
let list = JSON.parse(localStorage.getItem('todoList')) || [];

// Displays the list on the page
function showList() {
  if (list.length === 0) {
    toDoDisplay.innerHTML = `<p class="no-display">Add something to do...</p>`;
  } else {
    toDoDisplay.textContent = '';
    for (let i = 0; i < list.length; i += 1) {
      const li = document.createElement('li');
      li.innerHTML = list[i];

      // Edit button
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.classList.add('editBtn');
      editBtn.addEventListener('click', () => editToDo(i));

      //Delete b utton
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('deleteBtn');
      deleteBtn.addEventListener('click', () => deleteToDo(i));

      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      toDoDisplay.appendChild(li);
    }
  }
  localStorage.setItem('todoList', JSON.stringify(list));
}

// Adds items to the list
function addToDo() {
  const title = document.querySelector('.title').value;
  list.push(`<p>${title}</p>`);
  document.querySelector('.title').value = ''; // Clear input after adding
  showList();
}

// Edits an item in the list
function editToDo(index) {
  const newTitle = prompt('Edit your item:', list[index].replace(/<\/?[^>]+(>|$)/g, ""));
  if (newTitle) {
    list[index] = `<p>${newTitle}</p>`;
    showList();
  }
}

// Deletes an item from the list
function deleteToDo(index) {
  list.splice(index, 1);
  showList();
}

// Event listener for the Add button
addBtn.addEventListener('click', () => {
  addToDo();
});

// Initialize the list on page load
window.onload = showList;
