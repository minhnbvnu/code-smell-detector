function getListByPosition(pos, node, sourceFile) {
                        return node && getListByRange(pos, pos, node, sourceFile);
                    }