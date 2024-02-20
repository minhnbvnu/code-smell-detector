function classWrapperStatementVisitor(node) {
                if (shouldVisitNode(node)) {
                    const original = getOriginalNode(node);
                    if (isPropertyDeclaration(original) && hasStaticModifier(original)) {
                        const ancestorFacts = enterSubtree(32670 /* StaticInitializerExcludes */, 16449 /* StaticInitializerIncludes */);
                        const result = visitorWorker(node, 
                        /*expressionResultIsUnused*/
                        false);
                        exitSubtree(ancestorFacts, 98304 /* FunctionSubtreeExcludes */, 0 /* None */);
                        return result;
                    }
                    return visitorWorker(node, 
                    /*expressionResultIsUnused*/
                    false);
                }
                return node;
            }