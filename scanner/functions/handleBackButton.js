function handleBackButton() {
        //The "current" page is always at the top of the history stack.
        var current = backStack.pop();
        if (!current) { return; }
        var last = backStack[backStack.length - 1];
        if (!last && backStack.length == 0){
            last = initialState;
        }
        forwardStack.push(current);
    }