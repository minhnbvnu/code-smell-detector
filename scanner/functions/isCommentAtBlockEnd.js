function isCommentAtBlockEnd(token) {
                return (isCommentAtParentEnd(token, "ClassBody") ||
                    isCommentAtParentEnd(token, "BlockStatement") ||
                    isCommentAtParentEnd(token, "StaticBlock") ||
                    isCommentAtParentEnd(token, "SwitchCase") ||
                    isCommentAtParentEnd(token, "SwitchStatement"));
            }