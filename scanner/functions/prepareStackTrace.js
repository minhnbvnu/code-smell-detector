function prepareStackTrace(error, stack) {
        if (emptyCacheBetweenOperations) {
            fileContentsCache = {};
            sourceMapCache = {};
        }
        var name = error.name || 'Error';
        var message = error.message || '';
        var errorString = name + ": " + message;
        var state = { nextPosition: null, curPosition: null };
        var processedStack = [];
        for (var i = stack.length - 1; i >= 0; i--) {
            processedStack.push('\n    at ' + wrapCallSite(stack[i], state));
            state.nextPosition = state.curPosition;
        }
        state.curPosition = state.nextPosition = null;
        return errorString + processedStack.reverse().join('');
    }