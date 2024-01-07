function optimiseLengthGetter(path, argsId, offset) {
	  if (offset) {
	    path.parentPath.replaceWith(restLength({
	      ARGUMENTS: argsId,
	      OFFSET: t.numericLiteral(offset)
	    }));
	  } else {
	    path.replaceWith(argsId);
	  }
	}