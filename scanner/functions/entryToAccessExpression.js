function entryToAccessExpression(entry) {
            if (entry.node.parent) {
                const reference = entry.node;
                const parent2 = reference.parent;
                switch (parent2.kind) {
                    case 208 /* PropertyAccessExpression */:
                        const propertyAccessExpression = tryCast(parent2, isPropertyAccessExpression);
                        if (propertyAccessExpression && propertyAccessExpression.expression === reference) {
                            return propertyAccessExpression;
                        }
                        break;
                    case 209 /* ElementAccessExpression */:
                        const elementAccessExpression = tryCast(parent2, isElementAccessExpression);
                        if (elementAccessExpression && elementAccessExpression.expression === reference) {
                            return elementAccessExpression;
                        }
                        break;
                }
            }
            return void 0;
        }