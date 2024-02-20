function getObjectLiteralElementVisitor(parent2) {
                return (node) => saveStateAndInvoke(node, (n) => objectLiteralElementVisitorWorker(n, parent2));
            }