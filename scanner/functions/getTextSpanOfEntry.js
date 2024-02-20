function getTextSpanOfEntry(entry) {
            return entry.kind === 0 /* Span */ ? entry.textSpan : getTextSpan(entry.node, entry.node.getSourceFile());
        }