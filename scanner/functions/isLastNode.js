function isLastNode(node) {
                const token = sourceCode.getTokenAfter(node);
                return !token || (token.type === "Punctuator" && token.value === "}");
            }