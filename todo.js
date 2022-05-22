const todos = [
   { text: "Todo number one.", completed: false },
   { text: "Todo number two", completed: true },
   { text: "Todo number three", completed: false },
];

const filters = {
   searchText: "",
};

const rendertodos = (todosObj, filtersObj) => {
   const filteredTodos = todosObj.filter((todo) => {
      return todo.text
         .toLowerCase()
         .includes(filtersObj.searchText.toLowerCase());
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
   e.target.elements.newTodo.value = "";
   rendertodos(todos, filters);
});
