function replaceWithOrRemove(path, replacement) {
	  if (replacement) {
	    path.replaceWith(replacement);
	  } else {
	    path.remove();
	  }
	}