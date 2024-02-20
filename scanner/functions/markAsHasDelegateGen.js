function markAsHasDelegateGen(node) {
                var _a;
                if (!(scopeInfo === null || scopeInfo === void 0 ? void 0 : scopeInfo.isGen) || !node.argument) {
                    return;
                }
                if (((_a = node === null || node === void 0 ? void 0 : node.argument) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.Literal) {
                    // making this `false` as for literals we don't need to check the definition
                    // eg : async function* run() { yield* 1 }
                    scopeInfo.isAsyncYield || (scopeInfo.isAsyncYield = false);
                }
                const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node === null || node === void 0 ? void 0 : node.argument);
                const type = checker.getTypeAtLocation(tsNode);
                const typesToCheck = expandUnionOrIntersectionType(type);
                for (const type of typesToCheck) {
                    const asyncIterator = tsutils.getWellKnownSymbolPropertyOfType(type, 'asyncIterator', checker);
                    if (asyncIterator !== undefined) {
                        scopeInfo.isAsyncYield = true;
                        break;
                    }
                }
            }