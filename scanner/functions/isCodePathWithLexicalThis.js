function isCodePathWithLexicalThis(codePath, node) {
        return codePath.origin === "function" && node.type === "ArrowFunctionExpression";
    }