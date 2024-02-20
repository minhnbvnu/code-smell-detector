function isCommentAtBlockStart(token) {
                return (isCommentAtParentStart(token, "ClassBody") ||
                    isCommentAtParentStart(token, "BlockStatement") ||
                    isCommentAtParentStart(token, "StaticBlock") ||
                    isCommentAtParentStart(token, "SwitchCase") ||
                    isCommentAtParentStart(token, "SwitchStatement"));
            }