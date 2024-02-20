function visitArrowFunction(node) {
                if (node.transformFlags & 16384 /* ContainsLexicalThis */ && !(hierarchyFacts & 16384 /* StaticInitializer */)) {
                    hierarchyFacts |= 65536 /* CapturedLexicalThis */;
                }
                const savedConvertedLoopState = convertedLoopState;
                convertedLoopState = void 0;
                const ancestorFacts = enterSubtree(15232 /* ArrowFunctionExcludes */, 66 /* ArrowFunctionIncludes */);
                const func = factory2.createFunctionExpression(
                /*modifiers*/
                void 0, 
                /*asteriskToken*/
                void 0, 
                /*name*/
                void 0, 
                /*typeParameters*/
                void 0, visitParameterList(node.parameters, visitor, context), 
                /*type*/
                void 0, transformFunctionBody2(node));
                setTextRange(func, node);
                setOriginalNode(func, node);
                setEmitFlags(func, 16 /* CapturesThis */);
                exitSubtree(ancestorFacts, 0 /* ArrowFunctionSubtreeExcludes */, 0 /* None */);
                convertedLoopState = savedConvertedLoopState;
                return func;
            }