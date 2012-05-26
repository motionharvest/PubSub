PubSub
======

Pure Javascript implementation of a Publish/Subscribe pattern

======



PubSub is short for Publish and Subscribe.

When a function is done doing what it does, and you want other parts of your application (or website) to respond...

1) You can slop your code anywhere, and not care at all about the structure or purpose of your code. You can be as dumb as you want. Functionality and just sit inside of any scope, and listen to this global PubSub object.

2) Don't be lazy, and write smart applications that are structured in a way that new people to the project won't want to kill themselves because of how chaotic everything is.

The only reason to use PubSub is if you have no clue how to write custom event handlers, you're in a hurry, or you have a massive application that has spiraled out of control and there's no possible way to refactor it before it's deadline.

If you are starting an application from scratch. Don't use PubSub! It will distract you from structuring your code, and when thinking about how things should be structured, you will quickly find yourself in a mess of crossing events.

Its a slippery slope.


Imagine everything you wanted, came from a single location. You go to this location to watch new movies, buy new clothes, eat fresh pastries, as well as for every other thing you use, or buy, when its ready for you. What would be the best way to categorize how you are told when the things you need are ready?

The job of the publisher is pretty simple. It relays what you want when its ready. But the structure of "what you want" is up to the user to decide.

Lets say I'm tasked with keeping my house clean (in a javascript application sort of way).
When something in the room is dirty I want to clean it.

Rather than subscribing to every item in the room that could possibly become dirty, I can listen for a wildcard (*). When something in the current room tells me its dirty, I can respond accordingly.

Its especially nice when you don't know what the names will be, but want to be alerted when any action in a category is fired.
It should be stated that this code is moldable. It is only in its current state because I'm trying to tell my team not to use PubSub, and lean to write well structured, and intellegently designed applications. 

~~~
function Room(id, cleanables){
	var roomId = id;
	var thingsToClean = cleanables;
	this.status = function(){
		for(var i in thingsToClean){
			if(thingsToClean[i].length > 5){
              PubSub.publish("Room." + roomId + "." + i , {thing: i, needs:'cleaned'});
			}
		}
	};
	this.noticables = function(){
		return thingsToClean;
	};
	this.getRoomId = function(){
		return roomId;
	};
  this.clean = function(thing){
   thingsToClean[thing] = [];
    console.log('Cleaned the ' + thing);
  };
}
function Person(){
	var imIn;
    var attentionSpan;
  
	function takeAction(e){
      if(e.data.needs === "cleaned"){
		console.log("Whew, that "+ e.data.thing + " needs cleaned");
        clean(e.data.thing);
      }
	}
  function clean(what){
    imIn.clean(what);
  }
  
	this.lookAroundRoom = function(whatRoom){
        imIn = whatRoom;//?
        console.log("Let's see what we've got here in the " + imIn.getRoomId());
		attentionSpan = PubSub.subscribe("Room." + imIn.getRoomId() + ".*", takeAction);
		whatRoom.status();
	};
  
  this.leaveRoom = function(){
    imIn = undefined;
    PubSub.unsubscribe(attentionSpan);
  };
	
}

var kitchen = new Room('kitchen', {"trashCan":['wrapper','scraps','junkmail','toothpicks','qtip','peanut shells'], "bookcase":[], "floor":[]});

var aaron = new Person();
aaron.lookAroundRoom(kitchen);

var pete = new Person();
pete.lookAroundRoom(kitchen);
~~~









