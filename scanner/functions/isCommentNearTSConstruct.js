function isCommentNearTSConstruct(token) {
                return (isCommentAtInterfaceStart(token) ||
                    isCommentAtInterfaceEnd(token) ||
                    isCommentAtTypeStart(token) ||
                    isCommentAtTypeEnd(token) ||
                    isCommentAtEnumStart(token) ||
                    isCommentAtEnumEnd(token) ||
                    isCommentAtModuleStart(token) ||
                    isCommentAtModuleEnd(token));
            }