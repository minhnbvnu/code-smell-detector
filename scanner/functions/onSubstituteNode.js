function onSubstituteNode(hint, node) {
                if (isSourceFile(node)) {
                    currentSourceFile = node;
                    return previousOnSubstituteNode(hint, node);
                }
                else {
                    if (!currentSourceFile) {
                        return previousOnSubstituteNode(hint, node);
                    }
                    if (currentSourceFile.impliedNodeFormat === 99 /* ESNext */) {
                        return esmOnSubstituteNode(hint, node);
                    }
                    return cjsOnSubstituteNode(hint, node);
                }
            }