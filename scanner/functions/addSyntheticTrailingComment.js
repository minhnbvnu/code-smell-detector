function addSyntheticTrailingComment(node, kind, text, hasTrailingNewLine) {
            return setSyntheticTrailingComments(node, append(getSyntheticTrailingComments(node), { kind, pos: -1, end: -1, hasTrailingNewLine, text }));
        }