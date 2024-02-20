function replaceNode(original) {
                if (original.kind === 208 /* PropertyAccessExpression */) {
                    const replacement = useSitesToUnqualify.get(original);
                    useSitesToUnqualify.delete(original);
                    return replacement;
                }
            }