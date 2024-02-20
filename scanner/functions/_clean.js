function _clean(elem) {
    var clone,
	    i,
	    len = this.filters.length;

    // check whether the elem passes all of the filters
	  for (i = 0; i < len; i++) {
		  if (!this.filters[i](elem)) {
			  clone = elem.cloneNode(true);
			  this.current_element.appendChild(clone);
			  return;
		  }
	  }

    switch(elem.nodeType) {
      // Element
      case 1:
        _clean_element.call(this, elem)
        break;
      // Text
      case 3:
        var clone = elem.cloneNode(false);
        this.current_element.appendChild(clone);
        break;
      // Entity-Reference (normally not used)
      case 5:
        var clone = elem.cloneNode(false);
        this.current_element.appendChild(clone);
        break;
      // Comment
      case 8:
        if(this.config.allow_comments) {
          var clone = elem.cloneNode(false);
          this.current_element.appendChild(clone);
        }
      default:
        //console.log("unknown node type", elem.nodeType)
    }
 
  }