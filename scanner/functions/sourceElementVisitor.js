function sourceElementVisitor(node) {
                return saveStateAndInvoke(node, sourceElementVisitorWorker);
            }