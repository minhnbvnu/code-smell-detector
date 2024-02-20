function isUseStrictPrologue(node) {
            return isStringLiteral(node.expression) && node.expression.text === "use strict";
        }