function getNodeLocalName( node ) {
			var nodeLocalName = node.localName;			
			if(nodeLocalName == null) // Yeah, this is IE!! 
				nodeLocalName = node.baseName;
			if(nodeLocalName == null || nodeLocalName=="") // =="" is IE too
				nodeLocalName = node.nodeName;
			return nodeLocalName;
		}