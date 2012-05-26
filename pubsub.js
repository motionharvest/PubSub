/*
  PubSub - Dot Notation
  Author: Aaron Sherrill
  Follow me on Twitter @codecommando

  This is a work in progress

  Copyright (C) 2012 Aaron Sherrill
  
*/

var PubSub = {};

(function(){
  //Figure this out on your own. documentation just gets in the way sometimes.
  PubSub.subscribe = function(subscription, callback){
    var depths = subscription.split(".");
    var floor = this;
    for(var i = 0; i < depths.length; i++){
      if(!floor.hasOwnProperty(depths[i])){
        floor[depths[i]] = {};
      }
      floor = floor[depths[i]];
    }
    if(!floor.hasOwnProperty('subscriptions')){
     floor.subscriptions = [];
    }
    floor.subscriptions.push({
      Event: subscription,
      Callback: callback
    });
    return subscription +"-"+(floor.subscriptions.length - 1);
  };
  
  PubSub.publish = function(subscription, data){
    var depths = subscription.split(".");
    var wildcard;
    var floor = this;
    //move floor to the point at which its needed
    for(var i = 0; i < depths.length; i++){
      //if this level has a * subscription
      if(floor.hasOwnProperty("*")){
        firePublications(floor['*']);
      }
      floor = floor[depths[i]];
    }
    //loop through subscriptions at floor level
    function firePublications(level){
      if(!level){return false;}    
      for(var j = 0; j < level.subscriptions.length; j++){
        level.subscriptions[j].Callback({
          event: subscription,
          id: subscription + "-" + j,
          data: data
        });
      }
    }
    firePublications(floor);
  };

  PubSub.unsubscribe = function(id){
    var spl = id.split("-");
    var depths = spl[0].split(".");
    var index = spl[1];
    var floor = this;
    for(var i = 0; i < depths.length; i++){
      floor = floor[depths[i]];
    }
    if(floor.subscriptions[index]){
      floor.subscriptions.splice(index, 1);
    }else{
       console.log("this doesn't exist"); 
    }
  };
  
})();
