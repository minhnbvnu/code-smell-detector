function _removeContainer(instance) {
	    if (instance._container) {
	      var container = instance._container;
	      _reactDom2['default'].unmountComponentAtNode(container);
	      container.parentNode.removeChild(container);
	      instance._container = null;
	    }
	  }