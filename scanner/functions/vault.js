function vault(key, forget) {
	      // Only code that has access to the passkey can retrieve (or forget)
	      // the secret object.
	      if (key === passkey) {
	        return forget ? secret = null : secret || (secret = secretCreatorFn(object));
	      }
	    }