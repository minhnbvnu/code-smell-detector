function setParentRecursive(rootNode, incremental) {
            if (!rootNode)
                return rootNode;
            forEachChildRecursively(rootNode, isJSDocNode(rootNode) ? bindParentToChildIgnoringJSDoc : bindParentToChild);
            return rootNode;
            function bindParentToChildIgnoringJSDoc(child, parent2) {
                if (incremental && child.parent === parent2) {
                    return "skip";
                }
                setParent(child, parent2);
            }
            function bindJSDoc(child) {
                if (hasJSDocNodes(child)) {
                    for (const doc of child.jsDoc) {
                        bindParentToChildIgnoringJSDoc(doc, child);
                        forEachChildRecursively(doc, bindParentToChildIgnoringJSDoc);
                    }
                }
            }
            function bindParentToChild(child, parent2) {
                return bindParentToChildIgnoringJSDoc(child, parent2) || bindJSDoc(child);
            }
        }