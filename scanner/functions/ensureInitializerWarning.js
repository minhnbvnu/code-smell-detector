function ensureInitializerWarning(path, state) {
	        if (!state.initializerWarningHelper) {
	            state.initializerWarningHelper = path.scope.generateUidIdentifier('initializerWarningHelper');
	            var helper = buildInitializerWarningHelper({
	                NAME: state.initializerWarningHelper
	            });
	            path.scope.getProgramParent().path.unshiftContainer('body', helper);
	        }

	        return state.initializerWarningHelper;
	    }