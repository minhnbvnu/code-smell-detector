function overrideLeaveNode(node) {
    if (isProcessExit(node)) {
        this.currentNode = node

        forwardCurrentToHead(this, node)
        CodePath.getState(this.codePath).makeThrow()

        this.original.leaveNode(node)
        this.currentNode = null
    } else {
        originalLeaveNode.call(this, node)
    }
}