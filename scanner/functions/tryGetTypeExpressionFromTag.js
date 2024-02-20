function tryGetTypeExpressionFromTag(tag) {
                if (isTagWithTypeExpression(tag)) {
                    const typeExpression = isJSDocTemplateTag(tag) ? tag.constraint : tag.typeExpression;
                    return typeExpression && typeExpression.kind === 312 /* JSDocTypeExpression */ ? typeExpression : void 0;
                }
                if (isJSDocAugmentsTag(tag) || isJSDocImplementsTag(tag)) {
                    return tag.class;
                }
                return void 0;
            }