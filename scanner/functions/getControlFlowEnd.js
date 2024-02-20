function getControlFlowEnd(statement, checker) {
        return node_1.isBlockLike(statement) ? handleBlock(statement, checker) : getControlFlowEndWorker(statement, checker);
    }