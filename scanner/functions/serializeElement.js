function serializeElement(element, child, unrecognized, ephemera, xhtml) {
		// TODO: we should only lowercase element names if they are in an HTML namespace
		var elementName = element.nodeName.toLowerCase();
		// This is a hack around an IE bug which strips the namespace prefix
		// of element.nodeName if it occurs inside an contentEditable=true.
		if (element.scopeName && 'HTML' != element.scopeName && -1 === elementName.indexOf(':')) {
			elementName = element.scopeName.toLowerCase() + ':' + elementName;
		}
		if (!unrecognized && null == child && emptyElements[elementName]) {
			xhtml.push('<' + elementName + makeAttrString(element, ephemera) + '/>');
		} else {
			xhtml.push('<' + elementName + makeAttrString(element, ephemera) + '>');
			child = serializeChildren(element, child, unrecognized,  ephemera, xhtml);
			xhtml.push('</' + elementName + '>');
		}
		return child;
	}