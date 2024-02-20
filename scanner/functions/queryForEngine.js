function queryForEngine(engine, NodeList){
	var query = function(/*String*/ query, /*String|DOMNode?*/ root){
		//	summary:
		//		Returns nodes which match the given CSS selector, searching the
		//		entire document by default but optionally taking a node to scope
		//		the search by. Returns an instance of dojo.NodeList.
		if(typeof root == "string"){
			root = dom.byId(root);
			if(!root){
				return new NodeList([]);
			}
		}
		var results = typeof query == "string" ? engine(query, root) : query.orphan ? query : [query];
		if(results.orphan){
			// already wrapped
			return results; 
		}
		return new NodeList(results);
	};
	query.matches = engine.match || function(node, selector, root){
		// summary:
		//		Test to see if a node matches a selector
		return query.filter([node], selector, root).length > 0;
	};
	// the engine provides a filtering function, use it to for matching
	query.filter = engine.filter || function(nodes, selector, root){
		// summary:
		//		Filters an array of nodes. Note that this does not guarantee to return a dojo.NodeList, just an array.
		return query(selector, root).filter(function(node){
			return array.indexOf(nodes, node) > -1;
		});
	};
	if(typeof engine != "function"){
		var search = engine.search;
		engine = function(selector, root){
			// Slick does it backwards (or everyone else does it backwards, probably the latter)
			return search(root || document, selector);
		};
	}
	return query;
}