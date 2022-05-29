let todos = [];

const filters = {
   searchText: "",
   hideCompleted: false,
};

const todosJson = localStorage.getItem("todos");
if (todosJson !== null) {
   todos = JSON.parse(todosJson);
}

const rendertodos = (todosObj, filtersObj) => {
   let filteredTodos = todosObj.filter((todo) => {
      return todo.text
         .toLowerCase()
         .includes(filtersObj.searchText.toLowerCase());
   });

   // Filter is based on true or false for each todo.
   // On a given todo if hideCompleted is note true OR todo completed is not true.
   // Either all the todos if hideCompleted is false or just todos not completed.
   filteredTodos = filteredTodos.filter((todo) => {
      return !filters.hideCompleted || !todo.completed;
   });

   const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

   document.querySelector("#todos").innerHTML = ""; //clear todos

   const todoMessage = document.createElement("h2");
   todoMessage.textContent = `You have ${incompleteTodos.length} thing(s) left to do.`;
   document.querySelector("#todos").appendChild(todoMessage);

   filteredTodos.forEach((todo) => {
      const todoEl = document.createElement("p");
      todoEl.textContent = todo.text;
      document.querySelector("#todos").appendChild(todoEl);
   });
};

rendertodos(todos, filters);

//event listener for filter todos
document.querySelector("#filter-todos").addEventListener("input", (e) => {
   filters.searchText = e.target.value;
   rendertodos(todos, filters);
});

document.querySelector("#add-todo").addEventListener("submit", (e) => {
   e.preventDefault();
   todos.push({ text: e.target.elements.newTodo.value, completed: false });
   localStorage.setItem("todos", JSON.stringify(todos));
   e.target.elements.newTodo.value = "";
   rendertodos(todos, filters);
});

//event listener for hide completed todos
document.querySelector("#hide-completed").addEventListener("change", (e) => {
   filters.hideCompleted = e.target.checked;
   rendertodos(todos, filters);
});
