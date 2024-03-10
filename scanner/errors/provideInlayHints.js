            function visitor(node) {
                if (!node || node.getFullWidth() === 0) {
                    return;
                }
                switch (node.kind) {
                    case 264 /* ModuleDeclaration */:
                    case 260 /* ClassDeclaration */:
                    case 261 /* InterfaceDeclaration */:
                    case 259 /* FunctionDeclaration */:
                    case 228 /* ClassExpression */:
                    case 215 /* FunctionExpression */:
                    case 171 /* MethodDeclaration */:
                    case 216 /* ArrowFunction */:
                        cancellationToken.throwIfCancellationRequested();
                }
                if (!textSpanIntersectsWith(span, node.pos, node.getFullWidth())) {
                    return;
                }
                if (isTypeNode(node) && !isExpressionWithTypeArguments(node)) {
                    return;
                }
                if (preferences.includeInlayVariableTypeHints && isVariableDeclaration(node)) {
                    visitVariableLikeDeclaration(node);
                }
                else if (preferences.includeInlayPropertyDeclarationTypeHints && isPropertyDeclaration(node)) {
                    visitVariableLikeDeclaration(node);
                }
                else if (preferences.includeInlayEnumMemberValueHints && isEnumMember(node)) {
                    visitEnumMember(node);
                }
                else if (shouldShowParameterNameHints(preferences) && (isCallExpression(node) || isNewExpression(node))) {
                    visitCallOrNewExpression(node);
                }
                else {
                    if (preferences.includeInlayFunctionParameterTypeHints && isFunctionLikeDeclaration(node) && hasContextSensitiveParameters(node)) {
                        visitFunctionLikeForParameterType(node);
                    }
                    if (preferences.includeInlayFunctionLikeReturnTypeHints && isSignatureSupportingReturnAnnotation(node)) {
                        visitFunctionDeclarationLikeForReturnType(node);
                    }
                }
                return forEachChild(node, visitor);
            }