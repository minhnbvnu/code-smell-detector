function getRenderedStyle(elem, name) {
		    if (document.defaultView && document.defaultView.getComputedStyle) {
		        s = document.defaultView.getComputedStyle(elem, "");
		        r = [];

		        if (s.length) {
			        for (var i = 0; i < s.length; i++) {
			        	try {
				        	v = s.getPropertyValue(s[i]);
				        	if (v != '') {
				        		r.push(s[i] + ': ' + v);
				        	}
			        	} catch(e) {
			        	};
			        }
		        } else {
			        for (var i in s) {
			        	try {
				        	v = s.getPropertyValue(i);
				        	if (v != '') {
				        		r.push(i + ': ' + v);
				        	}
			        	} catch(e) {
			        	};
			        }
		        }

		        return r.join('; ') + ';';
		    } else {
		        return null;
		    }
		}