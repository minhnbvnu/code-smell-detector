function outerHTML(node){
		// if IE, Chrome take the internal method otherwise build one
		return /*node.outerHTML || */(
			function(n){
				return document.createElement('div').appendChild( n.cloneNode(true) ).parentNode.innerHTML;
			/*var div = document.createElement('div'), h;
			div.appendChild( n.cloneNode(true) );
				h = div.innerHTML;
				div = null;
				return h;*/
			}(node));
	}