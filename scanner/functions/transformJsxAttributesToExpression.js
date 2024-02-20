function transformJsxAttributesToExpression(attrs, children) {
                const expressions = flatten(spanMap(attrs, isJsxSpreadAttribute, (attrs2, isSpread) => isSpread ? map(attrs2, transformJsxSpreadAttributeToExpression) : factory2.createObjectLiteralExpression(map(attrs2, transformJsxAttributeToObjectLiteralElement))));
                if (isJsxSpreadAttribute(attrs[0])) {
                    expressions.unshift(factory2.createObjectLiteralExpression());
                }
                if (children) {
                    expressions.push(factory2.createObjectLiteralExpression([children]));
                }
                return singleOrUndefined(expressions) || emitHelpers().createAssignHelper(expressions);
            }