function getAliasSymbolForTypeNode(node) {
                let host2 = node.parent;
                while (isParenthesizedTypeNode(host2) || isJSDocTypeExpression(host2) || isTypeOperatorNode(host2) && host2.operator === 146 /* ReadonlyKeyword */) {
                    host2 = host2.parent;
                }
                return isTypeAlias(host2) ? getSymbolOfDeclaration(host2) : void 0;
            }