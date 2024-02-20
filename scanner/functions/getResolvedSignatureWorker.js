function getResolvedSignatureWorker(nodeIn, candidatesOutArray, argumentCount, checkMode) {
                const node = getParseTreeNode(nodeIn, isCallLikeExpression);
                apparentArgumentCount = argumentCount;
                const res = !node ? void 0 : getResolvedSignature(node, candidatesOutArray, checkMode);
                apparentArgumentCount = void 0;
                return res;
            }