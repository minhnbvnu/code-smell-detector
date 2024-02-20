function chainStartsWith(chain, subchain) {
            while (isCallExpression(chain) || isPropertyAccessExpression(chain) || isElementAccessExpression(chain)) {
                if (getTextOfChainNode(chain) === getTextOfChainNode(subchain))
                    break;
                chain = chain.expression;
            }
            while (isPropertyAccessExpression(chain) && isPropertyAccessExpression(subchain) || isElementAccessExpression(chain) && isElementAccessExpression(subchain)) {
                if (getTextOfChainNode(chain) !== getTextOfChainNode(subchain))
                    return false;
                chain = chain.expression;
                subchain = subchain.expression;
            }
            return isIdentifier(chain) && isIdentifier(subchain) && chain.getText() === subchain.getText();
        }