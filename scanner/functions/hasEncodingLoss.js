function hasEncodingLoss(oldType, newType) {
	  if (newType === 'complex64') {
	    return false;
	  }

	  if (newType === 'float32' && oldType !== 'complex64') {
	    return false;
	  }

	  if (newType === 'int32' && oldType !== 'float32' && oldType !== 'complex64') {
	    return false;
	  }

	  if (newType === 'bool' && oldType === 'bool') {
	    return false;
	  }

	  return true;
	}