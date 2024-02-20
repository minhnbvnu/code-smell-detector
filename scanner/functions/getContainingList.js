function getContainingList(node, sourceFile) {
                        return node.parent && getListByRange(node.getStart(sourceFile), node.getEnd(), node.parent, sourceFile);
                    }