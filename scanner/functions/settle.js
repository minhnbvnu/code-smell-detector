function settle(type, value) {
	    switch (type) {
	      case "return":
	        front.resolve({
	          value: value,
	          done: true
	        });
	        break;

	      case "throw":
	        front.reject(value);
	        break;

	      default:
	        front.resolve({
	          value: value,
	          done: false
	        });
	        break;
	    }

	    front = front.next;

	    if (front) {
	      resume(front.key, front.arg);
	    } else {
	      back = null;
	    }
	  }