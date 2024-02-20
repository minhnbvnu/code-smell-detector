function isAnonymousFunctionAssignmentException({ left, operator, right }) {
                if (left.type === "Identifier" && ["=", "&&=", "||=", "??="].includes(operator)) {
                    const rhsType = right.type;
                    if (rhsType === "ArrowFunctionExpression") {
                        return true;
                    }
                    if ((rhsType === "FunctionExpression" || rhsType === "ClassExpression") && !right.id) {
                        return true;
                    }
                }
                return false;
            }