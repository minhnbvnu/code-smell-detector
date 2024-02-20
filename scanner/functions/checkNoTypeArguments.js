function checkNoTypeArguments(node, symbol) {
                if (node.typeArguments) {
                    error(node, Diagnostics.Type_0_is_not_generic, symbol ? symbolToString(symbol) : node.typeName ? declarationNameToString(node.typeName) : anon);
                    return false;
                }
                return true;
            }