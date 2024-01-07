function makeAccessor(secretCreatorFn) {
	  var brand = makeUniqueKey();
	  var passkey = create(null);

	  secretCreatorFn = secretCreatorFn || defaultCreatorFn;

	  function register(object) {
	    var secret; // Created lazily.

	    function vault(key, forget) {
	      // Only code that has access to the passkey can retrieve (or forget)
	      // the secret object.
	      if (key === passkey) {
	        return forget ? secret = null : secret || (secret = secretCreatorFn(object));
	      }
	    }

	    defProp(object, brand, vault);
	  }

	  function accessor(object) {
	    if (!hasOwn.call(object, brand)) register(object);
	    return object[brand](passkey);
	  }

	  accessor.forget = function (object) {
	    if (hasOwn.call(object, brand)) object[brand](passkey, true);
	  };

	  return accessor;
	}