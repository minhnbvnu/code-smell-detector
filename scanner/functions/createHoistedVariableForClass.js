function createHoistedVariableForClass(name, node, suffix) {
                const { className } = getPrivateIdentifierEnvironment().data;
                const prefix = className ? { prefix: "_", node: className, suffix: "_" } : "_";
                const identifier = typeof name === "object" ? factory2.getGeneratedNameForNode(name, 16 /* Optimistic */ | 8 /* ReservedInNestedScopes */, prefix, suffix) : typeof name === "string" ? factory2.createUniqueName(name, 16 /* Optimistic */, prefix, suffix) : factory2.createTempVariable(
                /*recordTempVariable*/
                void 0, 
                /*reserveInNestedScopes*/
                true, prefix, suffix);
                if (resolver.getNodeCheckFlags(node) & 32768 /* BlockScopedBindingInLoop */) {
                    addBlockScopedVariable(identifier);
                }
                else {
                    hoistVariableDeclaration(identifier);
                }
                return identifier;
            }