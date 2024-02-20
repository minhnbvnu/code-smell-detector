function transformPropertyOrClassStaticBlock(property, receiver) {
                const expression = isClassStaticBlockDeclaration(property) ? transformClassStaticBlockDeclaration(property) : transformProperty(property, receiver);
                if (!expression) {
                    return void 0;
                }
                const statement = factory2.createExpressionStatement(expression);
                setOriginalNode(statement, property);
                addEmitFlags(statement, getEmitFlags(property) & 3072 /* NoComments */);
                setCommentRange(statement, property);
                const propertyOriginalNode = getOriginalNode(property);
                if (isParameter(propertyOriginalNode)) {
                    setSourceMapRange(statement, propertyOriginalNode);
                    removeAllComments(statement);
                }
                else {
                    setSourceMapRange(statement, moveRangePastModifiers(property));
                }
                setSyntheticLeadingComments(expression, void 0);
                setSyntheticTrailingComments(expression, void 0);
                if (hasAccessorModifier(propertyOriginalNode)) {
                    addEmitFlags(statement, 3072 /* NoComments */);
                }
                return statement;
            }