function _clean_element(elem) {
    var i, len, parent_element, name, allowed_attributes, attr, attr_name, attr_node, protocols, del, attr_ok;
    var transform = _transform_element.call(this, elem);
    var jQuery = this.jQuery;
    var isIE7 = Aloha.browser.msie && Aloha.browser.version === "7.0";
    
    elem = transform.node;
    name = elem.nodeName.toLowerCase();
    
    // check if element itself is allowed
    parent_element = this.current_element;
    if (this.allowed_elements[name] || transform.whitelist) {
        this.current_element = this.dom.createElement(elem.nodeName);
        parent_element.appendChild(this.current_element);

      // clean attributes
      allowed_attributes = _merge_arrays_uniq(
        this.config.attributes[name],
        this.config.attributes['__ALL__'],
        transform.attr_whitelist
      );
	    len = allowed_attributes.length;
	    for (i = 0; i < len; i++) {
		    attr_name = allowed_attributes[i];
		    attr = elem.attributes[attr_name];
		    if (attr) {
			    attr_ok = true;
			    // Check protocol attributes for valid protocol
			    if (this.config.protocols[name] && this.config.protocols[name][attr_name]) {
				    protocols = this.config.protocols[name][attr_name];
				    del = attr.nodeValue.toLowerCase().match(Sanitize.REGEX_PROTOCOL);
				    if (del) {
					    attr_ok = (_array_index(del[1], protocols) != -1);
				    }
				    else {
					    attr_ok = (_array_index(Sanitize.RELATIVE, protocols) != -1);
				    }
			    }
			    if (attr_ok) {
				    // sanitize does not work in IE7. It tries to set the style attribute via setAttributeNode() and this is know to not work in IE7
				    // (see http://www.it-blogger.com/2007-06-22/microsofts-internetexplorer-und-mitglied-nicht-gefunden/ as a reference)
				    if (!isIE7 || (isIE7 && "style" !== attr_name)) {
					    this.current_element.setAttribute(attr_name, attr.nodeValue)
				    }
			    }
		    }
      }

      // Add attributes
      if(this.config.add_attributes[name]) {
        for(attr_name in this.config.add_attributes[name]) {
        	// sanitize does not work in IE7. It tries to set the style attribute via setAttributeNode() and this is know to not work in IE7
			// (see http://www.it-blogger.com/2007-06-22/microsofts-internetexplorer-und-mitglied-nicht-gefunden/ as a reference)
        	if(!isIE7 || (isIE7 && "style" !== attr_name)) {
	          this.current_element.setAttribute(attr_name, this.config.add_attributes[name][attr_name]);
        	}
        }
      }
    } // End checking if element is allowed
    // If this node is in the dynamic whitelist array (built at runtime by
    // transformers), let it live with all of its attributes intact.
    else if(_array_index(elem, this.whitelist_nodes) != -1) {
      this.current_element = elem.cloneNode(true);
      // Remove child nodes, they will be sanitiazied and added by other code
	    var childNodesLength = this.current_element.childNodes.length;
	    while(childNodesLength > 0) {
            this.current_element.removeChild(this.current_element.firstChild);
      }
      parent_element.appendChild(this.current_element);
    }

    // iterate over child nodes
    if(!this.config.remove_all_contents && !this.config.remove_element_contents[name]) {
	    var childNodes = elem.childNodes,
		    len = childNodes.length;
	    for (i = 0; i < len; i++) {
		    _clean.call(this, childNodes[i]);
	    }
    }

    // some versions of IE don't support normalize.
    if(this.current_element.normalize) {
      this.current_element.normalize();
    }
    this.current_element = parent_element;
  }