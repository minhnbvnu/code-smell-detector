function endNode() {
            if (parent.children) {
                mergeChildren(parent.children, parent);
                sortChildren(parent.children);
            }
            parent = parentsStack.pop();
            trackedEs5Classes = trackedEs5ClassesStack.pop();
        }