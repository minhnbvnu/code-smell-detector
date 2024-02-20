function moveSyntheticComments(node, original) {
            setSyntheticLeadingComments(node, getSyntheticLeadingComments(original));
            setSyntheticTrailingComments(node, getSyntheticTrailingComments(original));
            const emit = getOrCreateEmitNode(original);
            emit.leadingComments = void 0;
            emit.trailingComments = void 0;
            return node;
        }