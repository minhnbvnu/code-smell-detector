function TransportMessageEvent(data) {
	  Event.call(this);
	  this.initEvent('message', false, false);
	  this.data = data;
	}