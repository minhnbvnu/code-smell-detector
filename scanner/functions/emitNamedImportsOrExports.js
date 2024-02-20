function emitNamedImportsOrExports(node) {
                writePunctuation("{");
                emitList(node, node.elements, 525136 /* NamedImportsOrExportsElements */);
                writePunctuation("}");
            }