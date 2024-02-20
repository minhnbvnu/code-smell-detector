function canFix(node) {
                const variables = context.getDeclaredVariables(node);
                const scopeNode = getScopeNode(node);
                if (node.parent.type === "SwitchCase" ||
                    node.declarations.some(hasSelfReferenceInTDZ) ||
                    variables.some(isGlobal) ||
                    variables.some(isRedeclared) ||
                    variables.some(isUsedFromOutsideOf(scopeNode)) ||
                    variables.some(hasNameDisallowedForLetDeclarations)) {
                    return false;
                }
                if (astUtils.isInLoop(node)) {
                    if (variables.some(isReferencedInClosure)) {
                        return false;
                    }
                    if (!isLoopAssignee(node) && !isDeclarationInitialized(node)) {
                        return false;
                    }
                }
                if (!isLoopAssignee(node) &&
                    !(node.parent.type === "ForStatement" && node.parent.init === node) &&
                    !astUtils.STATEMENT_LIST_PARENTS.has(node.parent.type)) {
                    // If the declaration is not in a block, e.g. `if (foo) var bar = 1;`, then it can't be fixed.
                    return false;
                }
                return true;
            }