function isPermitted() {
	  var permitted = {
	    granted: function allow() {
	      return Promise.resolve(true);
	    },
	    denied: function deny() {
	      return Promise.resolve(false);
	    },
	    "default": function ask() {
	      return Notification.requestPermission().then(function (permission) {
	        return permission === 'granted';
	      });
	    }
	  };
	  return permitted[Notification.permission]();
	}