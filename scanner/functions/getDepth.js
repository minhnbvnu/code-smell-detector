function getDepth(declaration) {
                            let depth = 0;
                            while (declaration) {
                                declaration = getContainerNode(declaration);
                                depth++;
                            }
                            return depth;
                        }