function getTypeDeepCloneUnionUndefined(typeNode) {
                if (typeNode === void 0) {
                    return void 0;
                }
                const clone2 = getSynthesizedDeepClone(typeNode);
                let withoutParens = clone2;
                while (isParenthesizedTypeNode(withoutParens)) {
                    withoutParens = withoutParens.type;
                }
                return isUnionTypeNode(withoutParens) && find(withoutParens.types, (t) => t.kind === 155 /* UndefinedKeyword */) ? clone2 : factory.createUnionTypeNode([clone2, factory.createKeywordTypeNode(155 /* UndefinedKeyword */)]);
            }