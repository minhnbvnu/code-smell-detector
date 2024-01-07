function ensureApplyDecoratedDescriptorHelper(path, state) {
	        if (!state.applyDecoratedDescriptor) {
	            state.applyDecoratedDescriptor = path.scope.generateUidIdentifier('applyDecoratedDescriptor');
	            var helper = buildApplyDecoratedDescriptor({
	                NAME: state.applyDecoratedDescriptor
	            });
	            path.scope.getProgramParent().path.unshiftContainer('body', helper);
	        }

	        return state.applyDecoratedDescriptor;
	    }