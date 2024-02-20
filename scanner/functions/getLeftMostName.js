function getLeftMostName(e) {
                return isIdentifier(e) ? e : isPropertyAccessExpression(e) ? getLeftMostName(e.expression) : void 0;
            }