function ensureInitializerDefineProp(path, state) {
	        if (!state.initializerDefineProp) {
	            state.initializerDefineProp = path.scope.generateUidIdentifier('initDefineProp');
	            var helper = buildInitializerDefineProperty({
	                NAME: state.initializerDefineProp
	            });
	            path.scope.getProgramParent().path.unshiftContainer('body', helper);
	        }

	        return state.initializerDefineProp;
	    }