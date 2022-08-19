'use strict'

let todos = getSavedTodos();

const filters = {
   searchText: "",
   hideCompleted: false,
};

rendertodos(todos, filters);

//event listener for filter todos
document.querySelector("#filter-todos").addEventListener("input", (e) => {
   filters.searchText = e.target.value;
   rendertodos(todos, filters);
});

document.querySelector("#add-todo").addEventListener("submit", (e) => {
   e.preventDefault();
   todos.push({
      id: uuidv4(),
      text: e.target.elements.newTodo.value,
      completed: false,
   });
   saveTodos(todos);

   e.target.elements.newTodo.value = "";
   rendertodos(todos, filters);
});

//event listener for hide completed todos
document.querySelector("#hide-completed").addEventListener("change", (e) => {
   filters.hideCompleted = e.target.checked;
   rendertodos(todos, filters);
});
