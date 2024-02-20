function createMissingList() {
                        const list = createNodeArray([], getNodePos());
                        list.isMissingList = true;
                        return list;
                    }