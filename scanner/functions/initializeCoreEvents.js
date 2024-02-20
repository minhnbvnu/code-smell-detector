function initializeCoreEvents(events) {
	    var this$1 = this;

	    var coreEvents = [
	        'start', 'end', 'next', 'newToken', 'contextStart',
	        'contextEnd', 'insertToken', 'removeToken', 'removeRange',
	        'replaceToken', 'replaceRange', 'composeRUD', 'updateContextsRanges'
	    ];

	    coreEvents.forEach(function (eventId) {
	        Object.defineProperty(this$1.events, eventId, {
	            value: new Event(eventId)
	        });
	    });

	    if (!!events) {
	        coreEvents.forEach(function (eventId) {
	            var event = events[eventId];
	            if (typeof event === 'function') {
	                this$1.events[eventId].subscribe(event);
	            }
	        });
	    }
	    var requiresContextUpdate = [
	        'insertToken', 'removeToken', 'removeRange',
	        'replaceToken', 'replaceRange', 'composeRUD'
	    ];
	    requiresContextUpdate.forEach(function (eventId) {
	        this$1.events[eventId].subscribe(
	            this$1.updateContextsRanges
	        );
	    });
	}