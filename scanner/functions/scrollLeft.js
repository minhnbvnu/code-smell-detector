function scrollLeft() {
			var doc = document.documentElement;
			var body = document.body;
			return (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
				(doc && doc.clientLeft || body && body.clientLeft || 0);
		}