PubSub
======

Pure Javascript implementation of a Publish/Subscribe pattern

======



PubSub is short for Publish and Subscribe.

When a function is done doing what it does, and you want other parts of your application (or website) to respond.

The way I see it, you can slop your code anywhere, and not care at all about the structure or purpose of it. Functionality can just sit inside of any scope, and listen to this global PubSub object. In the JavaScript reality, it is doable.

I think of it like the wild west. I don't know about you, but I prefer a little bit of structure in my life. Write smart applications that are structured in a way that new team members won't want to pull their hair out because of how chaotic everything is.

The situations I encourage the use of PubSub are if you have no clue how to write custom event handlers, you're in a hurry, or you have a massive application that has spiraled out of control and there's no possible way to refactor it.

If you are starting an application from scratch. Don't use PubSub. It will distract you from structuring your code. You will quickly find yourself in a mess of events. And when debugging, you'll always be looking through EVERY script for occurances of the subscription.

Its a slippery slope.

Imagine everything you wanted in life came from a single location and you got a text message every time something was ready for you. Eventually the number of text messages you'd be getting would become overwhelming. You wouldn't be able to focus on anything without being interupted with a notification to do something else. You'd need a better way to categorize your notifications. You might come to the conclusion that after a certain number of a certain type of thing is available, you'd go and pick them up.

The job of the publisher is pretty simple. It relays what you want when its ready, but not nessicarily when you're ready to get it. In order to manage groups of notifications, my PubSub object allows you to respond to wildcards.

Lets say I'm tasked with keeping my house clean (in a javascript application sort of way).
When something in the room is dirty I want to clean it.

Rather than subscribing to every item in the room that could possibly become dirty, I can listen for a wildcard (*). When something in the current room tells me its dirty, I can respond accordingly. Or take note of it, and when I have time, I'll clean it.


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
  	var thingThatNeedClean;
  	
	function takeAction(e){
      if(e.data.needs === "cleaned"){
		console.log("Whew, that "+ e.data.thing + " needs cleaned");
        thingsThatNeedCleaned.push({room:imIn, thing:e.data.thing});
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


Its especially nice when you don't know what the names will be, but want to be alerted when any action in a category is fired anway.
It should be stated that this code is moldable. It is only in its current state because I'm trying to tell my team not to use PubSub, and lean to write well structured, and intellegently designed applications instead. In order to have a leg to stand on, I figured I'd show them I know what I'm talking about, but let them choose what works for them. 







