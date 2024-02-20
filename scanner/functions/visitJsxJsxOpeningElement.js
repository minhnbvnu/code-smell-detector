function visitJsxJsxOpeningElement(node) {
                return factory2.updateJsxOpeningElement(node, Debug.checkDefined(visitNode(node.tagName, visitor, isJsxTagNameExpression)), 
                /*typeArguments*/
                void 0, Debug.checkDefined(visitNode(node.attributes, visitor, isJsxAttributes)));
            }