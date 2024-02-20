function addAttributeInElement( node, elementTarget, separator ) {

		var mardownClassesInElementsRegex = new RegExp( separator, 'mg' );
		var mardownClassRegex = new RegExp( "([^\"= ]+?)=\"([^\"=]+?)\"", 'mg' );
		var nodeValue = node.nodeValue;
		if( matches = mardownClassesInElementsRegex.exec( nodeValue ) ) {

			var classes = matches[1];
			nodeValue = nodeValue.substring( 0, matches.index ) + nodeValue.substring( mardownClassesInElementsRegex.lastIndex );
			node.nodeValue = nodeValue;
			while( matchesClass = mardownClassRegex.exec( classes ) ) {
				elementTarget.setAttribute( matchesClass[1], matchesClass[2] );
			}
			return true;
		}
		return false;
	}