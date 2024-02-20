function getJsxReferenceKind(node) {
                if (isJsxIntrinsicIdentifier(node.tagName)) {
                    return 2 /* Mixed */;
                }
                const tagType = getApparentType(checkExpression(node.tagName));
                if (length(getSignaturesOfType(tagType, 1 /* Construct */))) {
                    return 0 /* Component */;
                }
                if (length(getSignaturesOfType(tagType, 0 /* Call */))) {
                    return 1 /* Function */;
                }
                return 2 /* Mixed */;
            }