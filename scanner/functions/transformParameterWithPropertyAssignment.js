function transformParameterWithPropertyAssignment(node) {
                const name = node.name;
                if (!isIdentifier(name)) {
                    return void 0;
                }
                const propertyName = setParent(setTextRange(factory2.cloneNode(name), name), name.parent);
                setEmitFlags(propertyName, 3072 /* NoComments */ | 96 /* NoSourceMap */);
                const localName = setParent(setTextRange(factory2.cloneNode(name), name), name.parent);
                setEmitFlags(localName, 3072 /* NoComments */);
                return startOnNewLine(removeAllComments(setTextRange(setOriginalNode(factory2.createExpressionStatement(factory2.createAssignment(setTextRange(factory2.createPropertyAccessExpression(factory2.createThis(), propertyName), node.name), localName)), node), moveRangePos(node, -1))));
            }