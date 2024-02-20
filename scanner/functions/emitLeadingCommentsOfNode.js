function emitLeadingCommentsOfNode(node, emitFlags, pos, end) {
                enterComment();
                hasWrittenComment = false;
                const skipLeadingComments = pos < 0 || (emitFlags & 1024 /* NoLeadingComments */) !== 0 || node.kind === 11 /* JsxText */;
                const skipTrailingComments = end < 0 || (emitFlags & 2048 /* NoTrailingComments */) !== 0 || node.kind === 11 /* JsxText */;
                if ((pos > 0 || end > 0) && pos !== end) {
                    if (!skipLeadingComments) {
                        emitLeadingComments(pos, 
                        /*isEmittedNode*/
                        node.kind !== 355 /* NotEmittedStatement */);
                    }
                    if (!skipLeadingComments || pos >= 0 && (emitFlags & 1024 /* NoLeadingComments */) !== 0) {
                        containerPos = pos;
                    }
                    if (!skipTrailingComments || end >= 0 && (emitFlags & 2048 /* NoTrailingComments */) !== 0) {
                        containerEnd = end;
                        if (node.kind === 258 /* VariableDeclarationList */) {
                            declarationListContainerEnd = end;
                        }
                    }
                }
                forEach(getSyntheticLeadingComments(node), emitLeadingSynthesizedComment);
                exitComment();
            }