function transformJsxAttributesToObjectProps(attrs, children) {
                const target = getEmitScriptTarget(compilerOptions);
                return target && target >= 5 /* ES2018 */ ? factory2.createObjectLiteralExpression(transformJsxAttributesToProps(attrs, children)) : transformJsxAttributesToExpression(attrs, children);
            }