'use strict'

// get saved todos from local storage
const getSavedTodos = () => {
   const todosJson = localStorage.getItem("todos");
// try/catch allows program to keep going if not JSON data or some error
   try {
      return todosJson ? JSON.parse(todosJson) : []
   } catch(e) {
      return []
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

   const divWithIdTodos = document.querySelector("#todos"); // because we locate this div four times in this function

   divWithIdTodos.innerHTML = ""; //clear todos
   divWithIdTodos.appendChild(generateSummaryDOM(incompleteTodos));

   if(filteredTodos.length > 0){
      filteredTodos.forEach((todo) => {
         divWithIdTodos.appendChild(generateTodoDOM(todo));
      });
   } else {
      const emptyMessage = document.createElement("p")
      emptyMessage.classList.add("empty-message")
      emptyMessage.textContent = "No to-dos to show"
      divWithIdTodos.appendChild(emptyMessage)
   }

   
};


// generate dom element for each todo
// checkbox before and remove button after
// attached to div in html with id "todos" after summary message
// this dom structure gets rendered as:
      {/*   <label class="list-item">                //rootDiv
               <div class="list-item__container">    //containerEl
                  <input type="checkbox">            //checkbox
                     <span>one</span>                //todoEl
               </div>
               <button class="button button--text">remove</button>  //button
            </label> */}
const generateTodoDOM = (todo) => {
   const rootDiv = document.createElement("label");
   const containerEl = document.createElement("div")
   const checkbox = document.createElement("input");
   const button = document.createElement("button");
   const todoEl = document.createElement("span");

   //set up todo checkbox
   checkbox.setAttribute("type", "checkbox");
   checkbox.checked = todo.completed;
   containerEl.appendChild(checkbox);
   checkbox.addEventListener("change", () => {
      //toggle completed checkbox, save and rerender.
      todo.completed = !todo.completed;
      saveTodos(todos);
      rendertodos(todos, filters);
   });

   //set up todo text
   todoEl.textContent = todo.text;
   containerEl.appendChild(todoEl)

   //container
   rootDiv.classList.add("list-item")
   containerEl.classList.add("list-item__container")
   rootDiv.appendChild(containerEl)
   
   //set up remove button
   button.textContent = "remove";
   button.classList.add("button", "button--text")
   rootDiv.appendChild(button);

   button.addEventListener("click", () => {
      removeTodo(todo.id);
      saveTodos(todos);
      rendertodos(todos, filters);
   });
   
   return rootDiv;
};


//Todos left to do message
const generateSummaryDOM = (incompleteTodos) => {
   const todoMessage = document.createElement("h2");
   todoMessage.classList.add("list-title")
   const things = incompleteTodos.length === 1 ? "thing" : "things" 
   todoMessage.textContent = `You have ${incompleteTodos.length} ${things} left to do`;
   
   return todoMessage;
};
