var TODO = function(){

	// config and properties
	var STATES = {
		"CHECKED" : 1,
		"UNCHECKED" : 2
	}

	var theList = [],
		mainContainer,
		listHolder;

	

	// The list
	function List(){
		this.id = null;
		this.state = STATES.UNCHECKED;
		this.value = "";
	}

	List.prototype = {
		render : function(){
			var el;
			listHolder.insertAdjacentHTML("beforeend", TODO.Templates.list.replace("{ID}", this.id));
			el = listHolder.querySelector("[data-id='" + this.id + "']");
			el.querySelector("[data-type='check']").checked = (this.state == STATES.CHECKED);
			el.querySelector("[data-type='value']").textContent = this.value;
		},

		getJSON : function(){
			return {
				"state" : this.state,
				"value" : this.value
			}
		}
	}

	// persists a newly added list
	var saveTask = function(list){
		var serializedForm = list.getJSON();
		theList.push(serializedForm);
		//Store.set()
	}

	// reads the current lists and renders it
	var renderLists = function(){
		var list;
		theList = Store.get("todo-list");

		for(var i=0, len=theList.length; i<len; i++){
			list = new List();
			list.value = theList[i].value;
			list.id = i;
			list.state = theList[i].state;
			list.render();
		}
	}

	var addNewTask = function(){
		var task = document.querySelector("#new-task").value,
			list;

		if(task){
			list = new List();
			list.id = theList.length;
			list.value = task;
			list.state = STATES.UNCHECKED;
			list.render();
			saveTask(list);

			document.querySelector("#new-task").value = "";
		}
	}

	// public
	// renders the TODO app based on the config
	var init = function(config){
		holder = config.holder || document.body;
		holder.insertAdjacentHTML("beforeend", TODO.Templates.mainwrapper);
		listHolder = document.querySelector("#list-holder");

		renderLists();

		// attach events
		document.querySelector("#new").addEventListener("click", addNewTask);
	}

	return {
		init : init
	}
}();

/* --------------------------------------------------------------------------------------------------*/

TODO.Templates = {
	"mainwrapper" : "<div class='main-wrapper'>"+
						"<div id='list-holder'></div>"+
				  		"<div class='footer'>"+
				  			"<button id='new' style='float:right'>+</button>"+
				  			"<div class='inp-wrapper'><input id='new-task' ></div>" +
				  		"</div>"+
				  	"</div>",
	"list"	: "<div class='list' data-id='{ID}'>" +
			  		"<input data-type='check' type='checkbox' />" +
			  		"<span data-type='value'></span>" +
			  	"</div>"
}


// the persistance lib
var Store = function(){
	var get = function(){
		return [{value : "entry 1", state : 1}, {value : "entry 2", state : 2}];
	}

	return {
		get : get/*,
		put : put,
		remove : remove*/
	}
}();

