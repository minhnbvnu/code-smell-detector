function getNextJSDocCommentLocation(node) {
            const parent2 = node.parent;
            if (parent2.kind === 299 /* PropertyAssignment */ || parent2.kind === 274 /* ExportAssignment */ || parent2.kind === 169 /* PropertyDeclaration */ || parent2.kind === 241 /* ExpressionStatement */ && node.kind === 208 /* PropertyAccessExpression */ || parent2.kind === 250 /* ReturnStatement */ || getNestedModuleDeclaration(parent2) || isBinaryExpression(node) && node.operatorToken.kind === 63 /* EqualsToken */) {
                return parent2;
            }
            else if (parent2.parent && (getSingleVariableOfVariableStatement(parent2.parent) === node || isBinaryExpression(parent2) && parent2.operatorToken.kind === 63 /* EqualsToken */)) {
                return parent2.parent;
            }
            else if (parent2.parent && parent2.parent.parent && (getSingleVariableOfVariableStatement(parent2.parent.parent) || getSingleInitializerOfVariableStatementOrPropertyDeclaration(parent2.parent.parent) === node || getSourceOfDefaultedAssignment(parent2.parent.parent))) {
                return parent2.parent.parent;
            }
        }