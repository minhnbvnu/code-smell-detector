function visitMethodDeclaration(node) {
                Debug.assert(!isComputedPropertyName(node.name));
                const functionExpression = transformFunctionLikeToExpression(node, 
                /*location*/
                moveRangePos(node, -1), 
                /*name*/
                void 0, 
                /*container*/
                void 0);
                setEmitFlags(functionExpression, 1024 /* NoLeadingComments */ | getEmitFlags(functionExpression));
                return setTextRange(factory2.createPropertyAssignment(node.name, functionExpression), 
                /*location*/
                node);
            }