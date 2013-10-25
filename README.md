PubSub
======

Pure Javascript implementation of a Publish/Subscribe pattern


How it works
---
You get the code into your page. That part is up to you. There's a stand alone script or a CurlJS module.

	PubSub.subscribe("UI.ACTIVATE",  function(){
		//do some kind of activation
	});

This is handy if you want to load a bunch of files and then activate the UI when its done loading.
When you're ready for that action to happen simply call publish

	PubSub.publish("UI.ACTIVATE", { optional_object: "Can send data to the subscription" });


Since I sent data to the ```UI.ACTIVATE``` subscription you might want to log out that data

	PubSub.subscribe("UI.ACTIVATE",  function(e){
		//do some kind of activation
		console.log(e.data.optional_object);
	});
If you investigate that event  object you'll see that each event has an ```event, id, and  data``` properties. These can be used to modify subscription.


	PubSub.subscribe("UI.ACTIVATE",  function(e){
		//Unsubscribe after first activation
		PubSub.unsubscribe(e.id);
	});

Subscriptions can respond to wild cards too

	PubSub.subscribe("UI.*",  function(e){
		//good for tracking events in Google Analytics
		_gaq.push(['_trackEvent', 'UI', e.event]);
	});

