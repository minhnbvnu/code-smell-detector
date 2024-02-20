function emitObjectBindingPattern(node) {
                writePunctuation("{");
                emitList(node, node.elements, 525136 /* ObjectBindingPatternElements */);
                writePunctuation("}");
            }