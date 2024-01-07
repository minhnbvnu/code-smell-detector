function flattenBody(body) {
	      if (body.type === 'alternative') {
	        return body.body;
	      } else {
	        return [body];
	      }
	    }