function isUseStrictPrologue2(node) {
                return isStringLiteral(node.expression) && node.expression.text === "use strict";
            }