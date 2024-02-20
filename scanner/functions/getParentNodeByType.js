function getParentNodeByType(node, type, stopAtList) {
                let parent = node.parent;
                const stopAtSet = new Set(stopAtList || ["Program"]);
                while (parent.type !== type && !stopAtSet.has(parent.type) && parent.type !== "Program") {
                    parent = parent.parent;
                }
                return parent.type === type ? parent : null;
            }