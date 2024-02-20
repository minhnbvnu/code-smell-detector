function checkExpressionCached(node, checkMode) {
                if (checkMode) {
                    return checkExpression(node, checkMode);
                }
                const links = getNodeLinks(node);
                if (!links.resolvedType) {
                    const saveFlowLoopStart = flowLoopStart;
                    const saveFlowTypeCache = flowTypeCache;
                    flowLoopStart = flowLoopCount;
                    flowTypeCache = void 0;
                    links.resolvedType = checkExpression(node, checkMode);
                    flowTypeCache = saveFlowTypeCache;
                    flowLoopStart = saveFlowLoopStart;
                }
                return links.resolvedType;
            }