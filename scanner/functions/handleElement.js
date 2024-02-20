function handleElement(debugID, element) {
	  if (element == null || typeof element.type !== 'string') {
	    return;
	  }
	  if (element.type.indexOf('-') >= 0 || element.props.is) {
	    return;
	  }
	
	  warnInvalidARIAProps(debugID, element);
	}