function generateClassElementDecorationExpression(node, member) {
                const allDecorators = getAllDecoratorsOfClassElement(member, node, 
                /*useLegacyDecorators*/
                true);
                const decoratorExpressions = transformAllDecoratorsOfDeclaration(allDecorators);
                if (!decoratorExpressions) {
                    return void 0;
                }
                const prefix = getClassMemberPrefix(node, member);
                const memberName = getExpressionForPropertyName(member, 
                /*generateNameForComputedPropertyName*/
                !hasSyntacticModifier(member, 2 /* Ambient */));
                const descriptor = languageVersion > 0 /* ES3 */ ? isPropertyDeclaration(member) && !hasAccessorModifier(member) ? factory2.createVoidZero() : factory2.createNull() : void 0;
                const helper = emitHelpers().createDecorateHelper(decoratorExpressions, prefix, memberName, descriptor);
                setEmitFlags(helper, 3072 /* NoComments */);
                setSourceMapRange(helper, moveRangePastModifiers(member));
                return helper;
            }