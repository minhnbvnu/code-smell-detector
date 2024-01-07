function cloneIfTensor(item) {
	  if (item instanceof Tensor) {
	    return {
	      value: item.clone(),
	      recurse: false
	    };
	  } else if (isIterable$1(item)) {
	    return {
	      value: null,
	      recurse: true
	    };
	  } else {
	    return {
	      value: item,
	      recurse: false
	    };
	  }
	}