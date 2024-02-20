function getMatchingStart(chain, subchain) {
            if (!isIdentifier(subchain) && !isPropertyAccessExpression(subchain) && !isElementAccessExpression(subchain)) {
                return void 0;
            }
            return chainStartsWith(chain, subchain) ? subchain : void 0;
        }