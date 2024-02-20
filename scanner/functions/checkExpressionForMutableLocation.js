function checkExpressionForMutableLocation(node, checkMode, forceTuple) {
                const type = checkExpression(node, checkMode, forceTuple);
                return isConstContext(node) || isCommonJsExportedExpression(node) ? getRegularTypeOfLiteralType(type) : isTypeAssertion(node) ? type : getWidenedLiteralLikeTypeForContextualType(type, instantiateContextualType(getContextualType2(node, 
                /*contextFlags*/
                void 0), node, 
                /*contextFlags*/
                void 0));
            }