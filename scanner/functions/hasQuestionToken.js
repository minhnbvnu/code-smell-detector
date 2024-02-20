function hasQuestionToken(node) {
            if (node) {
                switch (node.kind) {
                    case 166 /* Parameter */:
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                    case 300 /* ShorthandPropertyAssignment */:
                    case 299 /* PropertyAssignment */:
                    case 169 /* PropertyDeclaration */:
                    case 168 /* PropertySignature */:
                        return node.questionToken !== void 0;
                }
            }
            return false;
        }