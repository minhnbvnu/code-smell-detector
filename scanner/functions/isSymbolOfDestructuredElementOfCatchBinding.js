function isSymbolOfDestructuredElementOfCatchBinding(symbol) {
                return symbol.valueDeclaration && isBindingElement(symbol.valueDeclaration) && walkUpBindingElementsAndPatterns(symbol.valueDeclaration).parent.kind === 295 /* CatchClause */;
            }