function getLastDescendant(node) {
                            while (true) {
                                const lastChild = getLastChild(node);
                                if (lastChild) {
                                    node = lastChild;
                                }
                                else {
                                    return node;
                                }
                            }
                        }