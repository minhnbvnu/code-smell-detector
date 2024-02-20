function tryGetClassImplementingOrExtendingExpressionWithTypeArguments(node) {
            if (isExpressionWithTypeArguments(node)) {
                if (isHeritageClause(node.parent) && isClassLike(node.parent.parent)) {
                    return { class: node.parent.parent, isImplements: node.parent.token === 117 /* ImplementsKeyword */ };
                }
                if (isJSDocAugmentsTag(node.parent)) {
                    const host = getEffectiveJSDocHost(node.parent);
                    if (host && isClassLike(host)) {
                        return { class: host, isImplements: false };
                    }
                }
            }
            return void 0;
        }