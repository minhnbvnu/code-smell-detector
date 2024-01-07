function checkUserDefinedMetadata(userDefinedMetadata, modelName, checkSize) {
	  if (checkSize === void 0) {
	    checkSize = false;
	  }

	  if (userDefinedMetadata == null || typeof userDefinedMetadata !== 'object' || Object.getPrototypeOf(userDefinedMetadata) !== Object.prototype || !plainObjectCheck(userDefinedMetadata)) {
	    throw new Error('User-defined metadata is expected to be a JSON object, but is not.');
	  }

	  if (checkSize) {
	    var out = JSON.stringify(userDefinedMetadata);

	    if (out.length > MAX_USER_DEFINED_METADATA_SERIALIZED_LENGTH) {
	      console.warn("User-defined metadata of model \"" + modelName + "\" is too large in " + ("size (length=" + out.length + " when serialized). It is not ") + "recommended to store such large objects in user-defined metadata. " + "Please make sure its serialized length is <= " + (MAX_USER_DEFINED_METADATA_SERIALIZED_LENGTH + "."));
	    }
	  }
	}