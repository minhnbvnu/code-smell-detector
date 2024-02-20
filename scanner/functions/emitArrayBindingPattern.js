function emitArrayBindingPattern(node) {
                writePunctuation("[");
                emitList(node, node.elements, 524880 /* ArrayBindingPatternElements */);
                writePunctuation("]");
            }