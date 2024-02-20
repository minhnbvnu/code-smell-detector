function entryToFunctionCall(entry) {
            if (entry.node.parent) {
                const functionReference = entry.node;
                const parent2 = functionReference.parent;
                switch (parent2.kind) {
                    case 210 /* CallExpression */:
                    case 211 /* NewExpression */:
                        const callOrNewExpression = tryCast(parent2, isCallOrNewExpression);
                        if (callOrNewExpression && callOrNewExpression.expression === functionReference) {
                            return callOrNewExpression;
                        }
                        break;
                    case 208 /* PropertyAccessExpression */:
                        const propertyAccessExpression = tryCast(parent2, isPropertyAccessExpression);
                        if (propertyAccessExpression && propertyAccessExpression.parent && propertyAccessExpression.name === functionReference) {
                            const callOrNewExpression2 = tryCast(propertyAccessExpression.parent, isCallOrNewExpression);
                            if (callOrNewExpression2 && callOrNewExpression2.expression === propertyAccessExpression) {
                                return callOrNewExpression2;
                            }
                        }
                        break;
                    case 209 /* ElementAccessExpression */:
                        const elementAccessExpression = tryCast(parent2, isElementAccessExpression);
                        if (elementAccessExpression && elementAccessExpression.parent && elementAccessExpression.argumentExpression === functionReference) {
                            const callOrNewExpression2 = tryCast(elementAccessExpression.parent, isCallOrNewExpression);
                            if (callOrNewExpression2 && callOrNewExpression2.expression === elementAccessExpression) {
                                return callOrNewExpression2;
                            }
                        }
                        break;
                }
            }
            return void 0;
        }