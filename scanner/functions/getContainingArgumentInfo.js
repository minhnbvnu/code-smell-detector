function getContainingArgumentInfo(node, position, sourceFile, checker, isManuallyInvoked) {
            for (let n = node; !isSourceFile(n) && (isManuallyInvoked || !isBlock(n)); n = n.parent) {
                Debug.assert(rangeContainsRange(n.parent, n), "Not a subspan", () => `Child: ${Debug.formatSyntaxKind(n.kind)}, parent: ${Debug.formatSyntaxKind(n.parent.kind)}`);
                const argumentInfo = getImmediatelyContainingArgumentOrContextualParameterInfo(n, position, sourceFile, checker);
                if (argumentInfo) {
                    return argumentInfo;
                }
            }
            return void 0;
        }