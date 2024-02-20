function isCommentAtModuleStart(token) {
                return isCommentAtParentStart(token, utils_1.AST_NODE_TYPES.TSModuleBlock);
            }