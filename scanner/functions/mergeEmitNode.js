function mergeEmitNode(sourceEmitNode, destEmitNode) {
            const { flags, internalFlags, leadingComments, trailingComments, commentRange, sourceMapRange, tokenSourceMapRanges, constantValue, helpers, startsOnNewLine, snippetElement } = sourceEmitNode;
            if (!destEmitNode)
                destEmitNode = {};
            if (leadingComments)
                destEmitNode.leadingComments = addRange(leadingComments.slice(), destEmitNode.leadingComments);
            if (trailingComments)
                destEmitNode.trailingComments = addRange(trailingComments.slice(), destEmitNode.trailingComments);
            if (flags)
                destEmitNode.flags = flags;
            if (internalFlags)
                destEmitNode.internalFlags = internalFlags & ~8 /* Immutable */;
            if (commentRange)
                destEmitNode.commentRange = commentRange;
            if (sourceMapRange)
                destEmitNode.sourceMapRange = sourceMapRange;
            if (tokenSourceMapRanges)
                destEmitNode.tokenSourceMapRanges = mergeTokenSourceMapRanges(tokenSourceMapRanges, destEmitNode.tokenSourceMapRanges);
            if (constantValue !== void 0)
                destEmitNode.constantValue = constantValue;
            if (helpers) {
                for (const helper of helpers) {
                    destEmitNode.helpers = appendIfUnique(destEmitNode.helpers, helper);
                }
            }
            if (startsOnNewLine !== void 0)
                destEmitNode.startsOnNewLine = startsOnNewLine;
            if (snippetElement !== void 0)
                destEmitNode.snippetElement = snippetElement;
            return destEmitNode;
        }