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
			listHolder.insertAdjacentHTML("beforeend", TODO.Templates.list);
		},

		remove : function(){

		},

		save : function(){

		}
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

	// public
	// renders the TODO app based on the config
	var init = function(config){
		holder = config.holder || document.body;
		holder.insertAdjacentHTML("beforeend", TODO.Templates.mainwrapper);
		listHolder = document.querySelector("#list-holder");

		renderLists();

		// attach events
		document.querySelector("new").addEventListener("click", function(){

		});
	}

	return {
		init : init
	}
}();

TODO.Templates = {
	"mainwrapper" : "<div class='main-wrapper'>"+
				  		"<div class='header'>"+
				  			"<button id='new'>+</button>"+
				  		"</div>"+
				  		"<div id='list-holder'></div>"+
				  	"</div>",
	"list"	: "<div class='list'>" +
			  		"<input type='checkbox' />" +
			  		"<input>" +
			  	"</div>"
}


// the persistance lib
var Store = function(){
	var get = function(){
		return [{value : "entry 1", state : 2}, {value : "entry 2", state : 2}];
	}

	return {
		get : get/*,
		put : put,
		remove : remove*/
	}
}();

