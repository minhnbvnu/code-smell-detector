function startNode(node, name) {
            const navNode = emptyNavigationBarNode(node, name);
            pushChild(parent, navNode);
            parentsStack.push(parent);
            trackedEs5ClassesStack.push(trackedEs5Classes);
            trackedEs5Classes = void 0;
            parent = navNode;
        }