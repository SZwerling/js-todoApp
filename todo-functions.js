// get saved todos from local storage
const getSavedTodos = () => {
   const todosJson = localStorage.getItem("todos");
   if (todosJson !== null) {
      return JSON.parse(todosJson);
   } else {
      return [];
   }
};

// save todos to local storage
const saveTodos = (todos) => {
   localStorage.setItem("todos", JSON.stringify(todos));
};

// remove todo by id
const removeTodo = (id) => {
   let index = todos.findIndex((todo) => todo.id === id);
   if (index > -1) {
      //if statement not really necessary// button created with todo with id so id must exist
      todos.splice(index, 1);
   }
};

// render todos based on filters
const rendertodos = (todosObj, filtersObj) => {
   let filteredTodos = todosObj.filter((todo) =>
      todo.text.toLowerCase().includes(filtersObj.searchText.toLowerCase())
   );

   // Filter is based on true or false for each todo.
   // On a given todo if hideCompleted is note true OR todo completed is not true.
   // Either all the todos if hideCompleted is false or just todos not completed.
   filteredTodos = filteredTodos.filter(
      (todo) => !filters.hideCompleted || !todo.completed
   );

   const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

   document.querySelector("#todos").innerHTML = ""; //clear todos
   document
      .querySelector("#todos")
      .appendChild(generateSummaryDOM(incompleteTodos));

   filteredTodos.forEach((todo) => {
      const todoEl = generateTodoDOM(todo);
      document.querySelector("#todos").appendChild(todoEl);
   });
};

// generate dom element for each todo
// checkbox before and remove button after
const generateTodoDOM = (todo) => {
   const rootDiv = document.createElement("div");
   const checkbox = document.createElement("input");
   const button = document.createElement("button");
   const todoEl = document.createElement("span");

   checkbox.setAttribute("type", "checkbox");
   checkbox.checked = todo.completed;

   button.textContent = "x";
   todoEl.textContent = todo.text;

   checkbox.addEventListener("change", () => {
      //toggle completed checkbox, save and rerender.
      todo.completed = !todo.completed;
      saveTodos(todos);
      rendertodos(todos, filters);
   });

   button.addEventListener("click", () => {
      removeTodo(todo.id);
      saveTodos(todos);
      rendertodos(todos, filters);
   });

   rootDiv.appendChild(checkbox);
   rootDiv.appendChild(todoEl);
   rootDiv.appendChild(button);

   return rootDiv;
};

const generateSummaryDOM = (incompleteTodos) => {
   const todoMessage = document.createElement("h2");
   todoMessage.textContent = `You have ${incompleteTodos.length} thing(s) left to do.`;
   return todoMessage;
};
