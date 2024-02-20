function isFunctionDeclarationOrFunctionExpressionContext(context) {
            return context.contextNode.kind === 259 /* FunctionDeclaration */ || context.contextNode.kind === 215 /* FunctionExpression */;
        }