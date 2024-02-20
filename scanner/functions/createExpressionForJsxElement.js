function createExpressionForJsxElement(factory2, callee, tagName, props, children, location) {
            const argumentsList = [tagName];
            if (props) {
                argumentsList.push(props);
            }
            if (children && children.length > 0) {
                if (!props) {
                    argumentsList.push(factory2.createNull());
                }
                if (children.length > 1) {
                    for (const child of children) {
                        startOnNewLine(child);
                        argumentsList.push(child);
                    }
                }
                else {
                    argumentsList.push(children[0]);
                }
            }
            return setTextRange(factory2.createCallExpression(callee, 
            /*typeArguments*/
            void 0, argumentsList), location);
        }