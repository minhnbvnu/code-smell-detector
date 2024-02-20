function visitJsxOpeningFragmentCreateElement(node, children, isChild, location) {
                const element = createExpressionForJsxFragment(factory2, context.getEmitResolver().getJsxFactoryEntity(currentSourceFile), context.getEmitResolver().getJsxFragmentFactoryEntity(currentSourceFile), compilerOptions.reactNamespace, 
                // TODO: GH#18217
                mapDefined(children, transformJsxChildToExpression), node, location);
                if (isChild) {
                    startOnNewLine(element);
                }
                return element;
            }