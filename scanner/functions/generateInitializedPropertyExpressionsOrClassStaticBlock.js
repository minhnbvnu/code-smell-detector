function generateInitializedPropertyExpressionsOrClassStaticBlock(propertiesOrClassStaticBlocks, receiver) {
                const expressions = [];
                for (const property of propertiesOrClassStaticBlocks) {
                    const expression = isClassStaticBlockDeclaration(property) ? transformClassStaticBlockDeclaration(property) : transformProperty(property, receiver);
                    if (!expression) {
                        continue;
                    }
                    startOnNewLine(expression);
                    setOriginalNode(expression, property);
                    addEmitFlags(expression, getEmitFlags(property) & 3072 /* NoComments */);
                    setSourceMapRange(expression, moveRangePastModifiers(property));
                    setCommentRange(expression, property);
                    expressions.push(expression);
                }
                return expressions;
            }