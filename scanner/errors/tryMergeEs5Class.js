function tryMergeEs5Class(a, b, bIndex, parent2) {
            function isPossibleConstructor(node) {
                return isFunctionExpression(node) || isFunctionDeclaration(node) || isVariableDeclaration(node);
            }
            const bAssignmentDeclarationKind = isBinaryExpression(b.node) || isCallExpression(b.node) ? getAssignmentDeclarationKind(b.node) : 0 /* None */;
            const aAssignmentDeclarationKind = isBinaryExpression(a.node) || isCallExpression(a.node) ? getAssignmentDeclarationKind(a.node) : 0 /* None */;
            if (isEs5ClassMember[bAssignmentDeclarationKind] && isEs5ClassMember[aAssignmentDeclarationKind] || isPossibleConstructor(a.node) && isEs5ClassMember[bAssignmentDeclarationKind] || isPossibleConstructor(b.node) && isEs5ClassMember[aAssignmentDeclarationKind] || isClassDeclaration(a.node) && isSynthesized(a.node) && isEs5ClassMember[bAssignmentDeclarationKind] || isClassDeclaration(b.node) && isEs5ClassMember[aAssignmentDeclarationKind] || isClassDeclaration(a.node) && isSynthesized(a.node) && isPossibleConstructor(b.node) || isClassDeclaration(b.node) && isPossibleConstructor(a.node) && isSynthesized(a.node)) {
                let lastANode = a.additionalNodes && lastOrUndefined(a.additionalNodes) || a.node;
                if (!isClassDeclaration(a.node) && !isClassDeclaration(b.node) || isPossibleConstructor(a.node) || isPossibleConstructor(b.node)) {
                    const ctorFunction = isPossibleConstructor(a.node) ? a.node : isPossibleConstructor(b.node) ? b.node : void 0;
                    if (ctorFunction !== void 0) {
                        const ctorNode = setTextRange(factory.createConstructorDeclaration(
                        /* modifiers */
                        void 0, [], 
                        /* body */
                        void 0), ctorFunction);
                        const ctor = emptyNavigationBarNode(ctorNode);
                        ctor.indent = a.indent + 1;
                        ctor.children = a.node === ctorFunction ? a.children : b.children;
                        a.children = a.node === ctorFunction ? concatenate([ctor], b.children || [b]) : concatenate(a.children || [{ ...a }], [ctor]);
                    }
                    else {
                        if (a.children || b.children) {
                            a.children = concatenate(a.children || [{ ...a }], b.children || [b]);
                            if (a.children) {
                                mergeChildren(a.children, a);
                                sortChildren(a.children);
                            }
                        }
                    }
                    lastANode = a.node = setTextRange(factory.createClassDeclaration(
                    /* modifiers */
                    void 0, a.name || factory.createIdentifier("__class__"), 
                    /* typeParameters */
                    void 0, 
                    /* heritageClauses */
                    void 0, []), a.node);
                }
                else {
                    a.children = concatenate(a.children, b.children);
                    if (a.children) {
                        mergeChildren(a.children, a);
                    }
                }
                const bNode = b.node;
                if (parent2.children[bIndex - 1].node.end === lastANode.end) {
                    setTextRange(lastANode, { pos: lastANode.pos, end: bNode.end });
                }
                else {
                    if (!a.additionalNodes)
                        a.additionalNodes = [];
                    a.additionalNodes.push(setTextRange(factory.createClassDeclaration(
                    /* modifiers */
                    void 0, a.name || factory.createIdentifier("__class__"), 
                    /* typeParameters */
                    void 0, 
                    /* heritageClauses */
                    void 0, []), b.node));
                }
                return true;
            }
            return bAssignmentDeclarationKind === 0 /* None */ ? false : true;
        }