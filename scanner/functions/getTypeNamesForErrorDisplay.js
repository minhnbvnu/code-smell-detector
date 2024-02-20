function getTypeNamesForErrorDisplay(left, right) {
                let leftStr = symbolValueDeclarationIsContextSensitive(left.symbol) ? typeToString(left, left.symbol.valueDeclaration) : typeToString(left);
                let rightStr = symbolValueDeclarationIsContextSensitive(right.symbol) ? typeToString(right, right.symbol.valueDeclaration) : typeToString(right);
                if (leftStr === rightStr) {
                    leftStr = getTypeNameForErrorDisplay(left);
                    rightStr = getTypeNameForErrorDisplay(right);
                }
                return [leftStr, rightStr];
            }