function isCheckable(elem) {
	  var type = elem.type;
	  var nodeName = elem.nodeName;
	  return nodeName && nodeName.toLowerCase() === 'input' && (type === 'checkbox' || type === 'radio');
	}