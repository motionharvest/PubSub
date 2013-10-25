define(function () {
	return {
		subscriptions: {},
		subscribe: function (subscription, callback) {

			//split subscription.
			var scope = subscription.split(".");
			var segment = this.subscriptions;

			//check if there's a path to that location's event/callback object
			for (var i = 0; i < scope.length; i++) {

				//if there isn't a property at this segment, create a blank one
				if (!segment.hasOwnProperty(scope[i])) {
					segment[scope[i]] = {
						'subscriptions': []
					};
				}

				//advance forward 1 step
				segment = segment[scope[i]];
			}

			//at the end of the chain, add a subscription object
			segment.subscriptions.push({
				'Event': subscription,
				'Callback': callback
			});

			//return a unique identifier
			return subscription + "-" + (segment.subscriptions.length - 1);

		},
		publish: function (subscription, data) {

			//split subscription.
			var scope = subscription.split(".");
			var segment = this.subscriptions;

			//check if there's a path to that location's event/callback object
			for (var i = 0; i < scope.length; i++) {

				//if there isn't a property at this segment there's no reason to continue
				if (!segment.hasOwnProperty(scope[i])) {
					console.log("DEBUG: The event [" + subscription + "] has no subscriptions");
					return false;
				}
				//advance forward 1 step into the object matching that name
				segment = segment[scope[i]];

				//if this level has a * listener, fire all of its children subscriptions with this data
				if (segment.hasOwnProperty("*")) {
					this.fireSubscriptions(segment['*'], subscription, data);
				}

			}

			//if you've made it to the end
			this.fireSubscriptions(segment, subscription, data);


		},
		fireSubscriptions: function (segment, subscription, data) {
			//if segment is undefined, end this function
			if (!segment) {
				return false;
			}

			//loop through the subscriptions array and fire out
			for (var j = 0; j < segment.subscriptions.length; j++) {
				segment.subscriptions[j].Callback({
					'event': subscription,
					'id': subscription + "-" + j,
					'data': data
				});
			}
		},
		unsubscribe: function (subscription_id) {
			//parse the subscription id and remove the event object at that location
			var spl = subscription_id.split("-");
			var segments = spl[0].split(".");
			var index = spl[1];
			var scope = this.subscriptions;

			//drill down to the last object in the segment's array
			for (var i = 0; i < segments.length; i++) {
				scope = scope[segments[i]];
			}
			//if there's a subscription object at the array index of this subscription-id
			if (scope.subscriptions[index]) {
				//remove it
				scope.subscriptions.splice(index, 1);
			}
		}
	};

});
