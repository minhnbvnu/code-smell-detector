function sanitizeJSDocImplements(clauses) {
                        const result = mapDefined(clauses, (e) => {
                            const oldEnclosing = context.enclosingDeclaration;
                            context.enclosingDeclaration = e;
                            let expr = e.expression;
                            if (isEntityNameExpression(expr)) {
                                if (isIdentifier(expr) && idText(expr) === "") {
                                    return cleanup(
                                    /*result*/
                                    void 0);
                                }
                                let introducesError;
                                ({ introducesError, node: expr } = trackExistingEntityName(expr, context, includePrivateSymbol));
                                if (introducesError) {
                                    return cleanup(
                                    /*result*/
                                    void 0);
                                }
                            }
                            return cleanup(factory.createExpressionWithTypeArguments(expr, map(e.typeArguments, (a) => serializeExistingTypeNode(context, a, includePrivateSymbol, bundled) || typeToTypeNodeHelper(getTypeFromTypeNode(a), context))));
                            function cleanup(result2) {
                                context.enclosingDeclaration = oldEnclosing;
                                return result2;
                            }
                        });
                        if (result.length === clauses.length) {
                            return result;
                        }
                        return void 0;
                    }