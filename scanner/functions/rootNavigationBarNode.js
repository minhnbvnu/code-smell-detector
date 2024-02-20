function rootNavigationBarNode(sourceFile) {
            Debug.assert(!parentsStack.length);
            const root = { node: sourceFile, name: void 0, additionalNodes: void 0, parent: void 0, children: void 0, indent: 0 };
            parent = root;
            for (const statement of sourceFile.statements) {
                addChildrenRecursively(statement);
            }
            endNode();
            Debug.assert(!parent && !parentsStack.length);
            return root;
        }