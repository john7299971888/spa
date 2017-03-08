angular.module('todoApp', [])
  .controller('TodoListController', function() {
    var todoList = this;
	//var todoList11 = $localStroage.getItem('todos');
	//todoList.todos = ($localStroage.getItem('todos')!==null)? JSON.parse(todoList11):[];
	/*
    todoList.todos = [	  {name:'John Peter',gpa:4.5, done:true},
						  {name:'Vimal',gpa:4.2, done:false}
					  ];
	*/					

	todoList.saved = localStorage.getItem('todos');
	todoList.todos = (localStorage.getItem('todos')!==null) ? JSON.parse(todoList.saved) : [ {name:'John Peter',gpa:4.5, done:true},
						  {name:'Vimal',gpa:4.2, done:false} ];
	localStorage.setItem('todos', JSON.stringify(todoList.todos));
					  
 
    todoList.addTodo = function() {
      todoList.todos.push({name:todoList.todoName,gpa:todoList.todoGPA, done:false});
	  todoList.todoName = '';
      todoList.todoGPA = '';	
	  
	  // Using localStroage API
	  //$localStroage.setItem('todos', JSON.stringify(todoList.todos));	
				var arr = [];//to collect id values
				todoList.file_items_unique=[];
				$.each(todoList.todos, function (index, value) {
					if ($.inArray(value.id, arr) == -1) { //check if id value not exits than add it
						arr.push(value.id);//push id value in arr
						todoList.file_items_unique.push(value); //put object in collection to access it's all values
						
					}
				});	  
	  
	  
	  localStorage.setItem('todos', JSON.stringify(todoList.file_items_unique));
	  
 
    };
 
    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
		localStorage.setItem('todos', JSON.stringify(todoList.todos));	  
	  
    };
  });