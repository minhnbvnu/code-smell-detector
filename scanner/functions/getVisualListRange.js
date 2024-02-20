function getVisualListRange(node, list, sourceFile) {
                        const children = node.getChildren(sourceFile);
                        for (let i = 1; i < children.length - 1; i++) {
                            if (children[i].pos === list.pos && children[i].end === list.end) {
                                return { pos: children[i - 1].end, end: children[i + 1].getStart(sourceFile) };
                            }
                        }
                        return list;
                    }