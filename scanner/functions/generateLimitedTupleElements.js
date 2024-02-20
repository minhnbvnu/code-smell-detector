function* generateLimitedTupleElements(node, target) {
                const len = length(node.elements);
                if (!len)
                    return;
                for (let i = 0; i < len; i++) {
                    if (isTupleLikeType(target) && !getPropertyOfType(target, "" + i))
                        continue;
                    const elem = node.elements[i];
                    if (isOmittedExpression(elem))
                        continue;
                    const nameType = getNumberLiteralType(i);
                    yield { errorNode: elem, innerExpression: elem, nameType };
                }
            }