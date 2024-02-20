function emitCommentsAfterNode(node, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd) {
                const emitFlags = getEmitFlags(node);
                const commentRange = getCommentRange(node);
                if (emitFlags & 4096 /* NoNestedComments */) {
                    commentsDisabled = false;
                }
                emitTrailingCommentsOfNode(node, emitFlags, commentRange.pos, commentRange.end, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
                const typeNode = getTypeNode(node);
                if (typeNode) {
                    emitTrailingCommentsOfNode(node, emitFlags, typeNode.pos, typeNode.end, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
                }
            }