function popAsyncFrame() {
    if (asyncContextStack.length > 0) {
        asyncContextStack.pop();
    }
}