function addAttributes( section, element, previousElement, separatorElementAttributes, separatorSectionAttributes ) {

		if ( element != null && element.childNodes != undefined && element.childNodes.length > 0 ) {
			previousParentElement = element;
			for( var i = 0; i < element.childNodes.length; i++ ) {
				childElement = element.childNodes[i];
				if ( i > 0 ) {
					j = i - 1;
					while ( j >= 0 ) {
						aPreviousChildElement = element.childNodes[j];
						if ( typeof aPreviousChildElement.setAttribute == 'function' && aPreviousChildElement.tagName != "BR" ) {
							previousParentElement = aPreviousChildElement;
							break;
						}
						j = j - 1;
					}
				}
				parentSection = section;
				if( childElement.nodeName ==  "section" ) {
					parentSection = childElement ;
					previousParentElement = childElement ;
				}
				if ( typeof childElement.setAttribute == 'function' || childElement.nodeType == Node.COMMENT_NODE ) {
					addAttributes( parentSection, childElement, previousParentElement, separatorElementAttributes, separatorSectionAttributes );
				}
			}
		}

		if ( element.nodeType == Node.COMMENT_NODE ) {
			if ( addAttributeInElement( element, previousElement, separatorElementAttributes ) == false ) {
				addAttributeInElement( element, section, separatorSectionAttributes );
			}
		}
	}