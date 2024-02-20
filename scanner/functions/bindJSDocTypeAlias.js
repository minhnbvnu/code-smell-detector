function bindJSDocTypeAlias(node) {
                bind(node.tagName);
                if (node.kind !== 343 /* JSDocEnumTag */ && node.fullName) {
                    setParent(node.fullName, node);
                    setParentRecursive(node.fullName, 
                    /*incremental*/
                    false);
                }
                if (typeof node.comment !== "string") {
                    bindEach(node.comment);
                }
            }