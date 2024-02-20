function _replaceNode(input) {
			        	var clone = $compile(input.clone().val(''))(scope);
			        	input.after(clone);
		            	input.remove();
			        }