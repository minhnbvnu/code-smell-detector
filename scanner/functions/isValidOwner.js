function isValidOwner(object) {
	  return !!(object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function');
	}