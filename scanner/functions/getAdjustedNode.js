function getAdjustedNode(node, options) {
                        if (options.use === 1 /* References */) {
                            node = getAdjustedReferenceLocation(node);
                        }
                        else if (options.use === 2 /* Rename */) {
                            node = getAdjustedRenameLocation(node);
                        }
                        return node;
                    }