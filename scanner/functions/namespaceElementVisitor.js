function namespaceElementVisitor(node) {
                return saveStateAndInvoke(node, namespaceElementVisitorWorker);
            }