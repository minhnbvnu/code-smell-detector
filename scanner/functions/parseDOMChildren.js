function parseDOMChildren( node, path ) {
			if(node.nodeType == DOMNodeTypes.DOCUMENT_NODE) {
				var result = new Object;
				var nodeChildren = node.childNodes;
				// Alternative for firstElementChild which is not supported in some environments
				for(var cidx=0; cidx <nodeChildren.length; cidx++) {
					var child = nodeChildren.item(cidx);
					if(child.nodeType == DOMNodeTypes.ELEMENT_NODE) {
						var childName = getNodeLocalName(child);
						result[childName] = parseDOMChildren(child, childName);
					}
				}
				return result;
			}
			else
			if(node.nodeType == DOMNodeTypes.ELEMENT_NODE) {
				var result = new Object;
				result.__cnt=0;
				
				var nodeChildren = node.childNodes;
				
				// Children nodes
				for(var cidx=0; cidx <nodeChildren.length; cidx++) {
					var child = nodeChildren.item(cidx); // nodeChildren[cidx];
					var childName = getNodeLocalName(child);
					
					if(child.nodeType!= DOMNodeTypes.COMMENT_NODE) {
						var childPath = path+"."+childName;
						if (checkXmlElementsFilter(result,child.nodeType,childName,childPath)) {
							result.__cnt++;
							if(result[childName] == null) {
								result[childName] = parseDOMChildren(child, childPath);
								toArrayAccessForm(result, childName, childPath);					
							}
							else {
								if(result[childName] != null) {
									if( !(result[childName] instanceof Array)) {
										result[childName] = [result[childName]];
										toArrayAccessForm(result, childName, childPath);
									}
								}
								(result[childName])[result[childName].length] = parseDOMChildren(child, childPath);
							}
						}
					}								
				}
				
				// Attributes
				for(var aidx=0; aidx <node.attributes.length; aidx++) {
					var attr = node.attributes.item(aidx); // [aidx];
					result.__cnt++;
					result[config.attributePrefix+attr.name]=attr.value;
				}
				
				// Node namespace prefix
				var nodePrefix = getNodePrefix(node);
				if(nodePrefix!=null && nodePrefix!="") {
					result.__cnt++;
					result.__prefix=nodePrefix;
				}
				
				if(result["#text"]!=null) {				
					result.__text = result["#text"];
					if(result.__text instanceof Array) {
						result.__text = result.__text.join("\n");
					}
					//if(config.escapeMode)
					//	result.__text = unescapeXmlChars(result.__text);
					if(config.stripWhitespaces)
						result.__text = result.__text.trim();
					delete result["#text"];
					if(config.arrayAccessForm=="property")
						delete result["#text_asArray"];
					result.__text = checkFromXmlDateTimePaths(result.__text, childName, path+"."+childName);
				}
				if(result["#cdata-section"]!=null) {
					result.__cdata = result["#cdata-section"];
					delete result["#cdata-section"];
					if(config.arrayAccessForm=="property")
						delete result["#cdata-section_asArray"];
				}
				
				if( result.__cnt == 0 && config.emptyNodeForm=="text" ) {
					result = '';
				}
				else
				if( result.__cnt == 1 && result.__text!=null  ) {
					result = result.__text;
				}
				else
				if( result.__cnt == 1 && result.__cdata!=null && !config.keepCData  ) {
					result = result.__cdata;
				}			
				else			
				if ( result.__cnt > 1 && result.__text!=null && config.skipEmptyTextNodesForObj) {
					if( (config.stripWhitespaces && result.__text=="") || (result.__text.trim()=="")) {
						delete result.__text;
					}
				}
				delete result.__cnt;			
				
				if( config.enableToStringFunc && (result.__text!=null || result.__cdata!=null )) {
					result.toString = function() {
						return (this.__text!=null? this.__text:'')+( this.__cdata!=null ? this.__cdata:'');
					};
				}
				
				return result;
			}
			else
			if(node.nodeType == DOMNodeTypes.TEXT_NODE || node.nodeType == DOMNodeTypes.CDATA_SECTION_NODE) {
				return node.nodeValue;
			}	
		}