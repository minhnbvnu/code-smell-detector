function getEndPos(sourceFile, node) {
            switch (node.kind) {
                case 344 /* JSDocParameterTag */:
                case 341 /* JSDocCallbackTag */:
                case 351 /* JSDocPropertyTag */:
                case 349 /* JSDocTypedefTag */:
                case 346 /* JSDocThisTag */:
                    return sourceFile.getLineEndOfPosition(node.getStart());
                default:
                    return node.getEnd();
            }
        }