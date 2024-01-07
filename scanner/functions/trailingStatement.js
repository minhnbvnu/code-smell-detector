function trailingStatement(node) {
	        switch (node.type) {
	            case 'IfStatement':
	                if (node.alternate != null) {
	                    return node.alternate;
	                }
	                return node.consequent;

	            case 'LabeledStatement':
	            case 'ForStatement':
	            case 'ForInStatement':
	            case 'WhileStatement':
	            case 'WithStatement':
	                return node.body;
	        }
	        return null;
	    }