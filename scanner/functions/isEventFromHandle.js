function isEventFromHandle(e, handles) {
	  return Object.keys(handles).some(function (key) {
	    return e.target === (0, _reactDom.findDOMNode)(handles[key]);
	  });
	}