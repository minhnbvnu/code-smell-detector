function transformFunctionLikeToExpression(node, location, name, container) {
                const savedConvertedLoopState = convertedLoopState;
                convertedLoopState = void 0;
                const ancestorFacts = container && isClassLike(container) && !isStatic(node) ? enterSubtree(32670 /* FunctionExcludes */, 65 /* FunctionIncludes */ | 8 /* NonStaticClassElement */) : enterSubtree(32670 /* FunctionExcludes */, 65 /* FunctionIncludes */);
                const parameters = visitParameterList(node.parameters, visitor, context);
                const body = transformFunctionBody2(node);
                if (hierarchyFacts & 32768 /* NewTarget */ && !name && (node.kind === 259 /* FunctionDeclaration */ || node.kind === 215 /* FunctionExpression */)) {
                    name = factory2.getGeneratedNameForNode(node);
                }
                exitSubtree(ancestorFacts, 98304 /* FunctionSubtreeExcludes */, 0 /* None */);
                convertedLoopState = savedConvertedLoopState;
                return setOriginalNode(setTextRange(factory2.createFunctionExpression(
                /*modifiers*/
                void 0, node.asteriskToken, name, 
                /*typeParameters*/
                void 0, parameters, 
                /*type*/
                void 0, body), location), 
                /*original*/
                node);
            }