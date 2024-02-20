function bindJSDoc(node) {
                if (hasJSDocNodes(node)) {
                    if (isInJSFile(node)) {
                        for (const j of node.jsDoc) {
                            bind(j);
                        }
                    }
                    else {
                        for (const j of node.jsDoc) {
                            setParent(j, node);
                            setParentRecursive(j, 
                            /*incremental*/
                            false);
                        }
                    }
                }
            }