function addSyntheticLeadingComment(node, kind, text, hasTrailingNewLine) {
            return setSyntheticLeadingComments(node, append(getSyntheticLeadingComments(node), { kind, pos: -1, end: -1, hasTrailingNewLine, text }));
        }