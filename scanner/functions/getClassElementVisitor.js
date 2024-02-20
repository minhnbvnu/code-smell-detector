function getClassElementVisitor(parent2) {
                return (node) => saveStateAndInvoke(node, (n) => classElementVisitorWorker(n, parent2));
            }