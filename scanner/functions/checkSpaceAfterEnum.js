function checkSpaceAfterEnum(node) {
                const punctuator = sourceCode.getTokenAfter(node.id);
                if (punctuator) {
                    checkPrecedingSpace(punctuator);
                }
            }