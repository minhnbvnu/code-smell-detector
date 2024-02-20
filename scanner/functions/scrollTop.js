function scrollTop() {
			var doc = document.documentElement;
			var body = document.body;
			return (doc && doc.scrollTop || body && body.scrollTop || 0) -
				(doc && doc.clientTop || body && body.clientTop || 0);
		}