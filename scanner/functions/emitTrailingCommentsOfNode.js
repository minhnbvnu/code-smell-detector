function emitTrailingCommentsOfNode(node, emitFlags, pos, end, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd) {
                enterComment();
                const skipTrailingComments = end < 0 || (emitFlags & 2048 /* NoTrailingComments */) !== 0 || node.kind === 11 /* JsxText */;
                forEach(getSyntheticTrailingComments(node), emitTrailingSynthesizedComment);
                if ((pos > 0 || end > 0) && pos !== end) {
                    containerPos = savedContainerPos;
                    containerEnd = savedContainerEnd;
                    declarationListContainerEnd = savedDeclarationListContainerEnd;
                    if (!skipTrailingComments && node.kind !== 355 /* NotEmittedStatement */) {
                        emitTrailingComments(end);
                    }
                }
                exitComment();
            }