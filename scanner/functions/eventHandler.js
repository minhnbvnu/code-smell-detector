function eventHandler(type, mustBubble){
		// emulation of mouseenter/leave with mouseover/out using descendant checking
		var handler = function(node, listener){
			return on(node, type, function(evt){
				if(!dom.isDescendant(evt.relatedTarget, mustBubble ? evt.target : node)){
					return listener.call(this, evt);
				}
			});
		};
		if(!mustBubble){
			handler.bubble = eventHandler(type, true);
		}
		return handler;
	}