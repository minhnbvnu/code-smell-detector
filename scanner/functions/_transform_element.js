function _transform_element(node) {
    var output = {
      attr_whitelist:[],
      node: node,
      whitelist: false
    };
    var transform,
	    i,
	    j,
	    transLength = this.transformers.length,
	    len;
	for (i = 0; i < transLength; i++) {
      transform = this.transformers[i]({
        allowed_elements: this.allowed_elements,
        config: this.config,
        node: node,
        node_name: node.nodeName.toLowerCase(),
        whitelist_nodes: this.whitelist_nodes,
        dom: this.dom
      });
      if(transform == null) 
        continue;
      else if(typeof transform == 'object') {
        if(transform.whitelist_nodes && transform.whitelist_nodes instanceof Array) {
	      len = transform.whitelist_nodes.length
	      for (j = 0; j < len; j++) {
            if(_array_index(transform.whitelist_nodes[j], this.whitelist_nodes) == -1) {
              this.whitelist_nodes.push(transform.whitelist_nodes[j]);
            }
          }
        }
        output.whitelist = transform.whitelist ? true : false;
        if(transform.attr_whitelist) {
          output.attr_whitelist = _merge_arrays_uniq(output.attr_whitelist, transform.attr_whitelist);
        }
        output.node = transform.node ? transform.node : output.node;
      }
      else {
        throw new Error("transformer output must be an object or null");
      }
    }
    return output;
  }