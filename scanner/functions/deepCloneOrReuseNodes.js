function deepCloneOrReuseNodes(nodes, visitor, test, start, count) {
                            if (nodes && nodes.length === 0) {
                                return setTextRange(factory.createNodeArray(
                                /*nodes*/
                                void 0, nodes.hasTrailingComma), nodes);
                            }
                            return visitNodes2(nodes, visitor, test, start, count);
                        }