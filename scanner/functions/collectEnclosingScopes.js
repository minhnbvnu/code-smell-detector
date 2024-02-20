function collectEnclosingScopes(range) {
            let current = isReadonlyArray(range.range) ? first(range.range) : range.range;
            if (range.facts & 8 /* UsesThis */ && !(range.facts & 16 /* UsesThisInFunction */)) {
                const containingClass = getContainingClass(current);
                if (containingClass) {
                    const containingFunction = findAncestor(current, isFunctionLikeDeclaration);
                    return containingFunction ? [containingFunction, containingClass] : [containingClass];
                }
            }
            const scopes = [];
            while (true) {
                current = current.parent;
                if (current.kind === 166 /* Parameter */) {
                    current = findAncestor(current, (parent2) => isFunctionLikeDeclaration(parent2)).parent;
                }
                if (isScope(current)) {
                    scopes.push(current);
                    if (current.kind === 308 /* SourceFile */) {
                        return scopes;
                    }
                }
            }
        }