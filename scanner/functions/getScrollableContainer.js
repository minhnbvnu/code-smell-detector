function getScrollableContainer(n) {
	  var node = n;
	  var nodeName = void 0;
	  /* eslint no-cond-assign:0 */
	  while ((nodeName = node.nodeName.toLowerCase()) !== 'body') {
	    var overflowY = computedStyle(node, 'overflowY');
	    // https://stackoverflow.com/a/36900407/3040605
	    if (node !== n && (overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) {
	      return node;
	    }
	    node = node.parentNode;
	  }
	  return nodeName === 'body' ? node.ownerDocument : node;
	}