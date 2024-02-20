function updateBundle(node, sourceFiles, prepends = emptyArray) {
                return node.sourceFiles !== sourceFiles || node.prepends !== prepends ? update(createBundle(sourceFiles, prepends), node) : node;
            }