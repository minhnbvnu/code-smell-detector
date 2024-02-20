function handleForwardButton() {
        //summary: private method. Do not call this directly.

        var last = forwardStack.pop();
        if (!last) { return; }
        backStack.push(last);
    }