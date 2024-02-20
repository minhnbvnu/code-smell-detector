function getClassNameFromPrototypeMethod(container) {
                if (container.kind === 215 /* FunctionExpression */ && isBinaryExpression(container.parent) && getAssignmentDeclarationKind(container.parent) === 3 /* PrototypeProperty */) {
                    return container.parent.left.expression.expression;
                }
                else if (container.kind === 171 /* MethodDeclaration */ && container.parent.kind === 207 /* ObjectLiteralExpression */ && isBinaryExpression(container.parent.parent) && getAssignmentDeclarationKind(container.parent.parent) === 6 /* Prototype */) {
                    return container.parent.parent.left.expression;
                }
                else if (container.kind === 215 /* FunctionExpression */ && container.parent.kind === 299 /* PropertyAssignment */ && container.parent.parent.kind === 207 /* ObjectLiteralExpression */ && isBinaryExpression(container.parent.parent.parent) && getAssignmentDeclarationKind(container.parent.parent.parent) === 6 /* Prototype */) {
                    return container.parent.parent.parent.left.expression;
                }
                else if (container.kind === 215 /* FunctionExpression */ && isPropertyAssignment(container.parent) && isIdentifier(container.parent.name) && (container.parent.name.escapedText === "value" || container.parent.name.escapedText === "get" || container.parent.name.escapedText === "set") && isObjectLiteralExpression(container.parent.parent) && isCallExpression(container.parent.parent.parent) && container.parent.parent.parent.arguments[2] === container.parent.parent && getAssignmentDeclarationKind(container.parent.parent.parent) === 9 /* ObjectDefinePrototypeProperty */) {
                    return container.parent.parent.parent.arguments[0].expression;
                }
                else if (isMethodDeclaration(container) && isIdentifier(container.name) && (container.name.escapedText === "value" || container.name.escapedText === "get" || container.name.escapedText === "set") && isObjectLiteralExpression(container.parent) && isCallExpression(container.parent.parent) && container.parent.parent.arguments[2] === container.parent && getAssignmentDeclarationKind(container.parent.parent) === 9 /* ObjectDefinePrototypeProperty */) {
                    return container.parent.parent.arguments[0].expression;
                }
            }