function hasOctalOrNonOctalDecimalEscapeSequence(node) {
        if (isConcatenation(node)) {
            return (hasOctalOrNonOctalDecimalEscapeSequence(node.left) ||
                hasOctalOrNonOctalDecimalEscapeSequence(node.right));
        }
        // No need to check TemplateLiterals – would throw parsing error
        if (node.type === "Literal" && typeof node.value === "string") {
            return astUtils.hasOctalOrNonOctalDecimalEscapeSequence(node.raw);
        }
        return false;
    }