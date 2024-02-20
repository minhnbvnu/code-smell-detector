function shouldEmitComments(node) {
                return !commentsDisabled && !isSourceFile(node);
            }