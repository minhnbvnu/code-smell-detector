function generateConstructorDecorationExpression(node) {
                const allDecorators = getAllDecoratorsOfClass(node);
                const decoratorExpressions = transformAllDecoratorsOfDeclaration(allDecorators);
                if (!decoratorExpressions) {
                    return void 0;
                }
                const classAlias = classAliases && classAliases[getOriginalNodeId(node)];
                const localName = languageVersion <= 2 /* ES2015 */ ? factory2.getInternalName(node, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true) : factory2.getLocalName(node, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true);
                const decorate = emitHelpers().createDecorateHelper(decoratorExpressions, localName);
                const expression = factory2.createAssignment(localName, classAlias ? factory2.createAssignment(classAlias, decorate) : decorate);
                setEmitFlags(expression, 3072 /* NoComments */);
                setSourceMapRange(expression, moveRangePastModifiers(node));
                return expression;
            }