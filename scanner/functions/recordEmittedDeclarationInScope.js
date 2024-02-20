function recordEmittedDeclarationInScope(node) {
                if (!currentScopeFirstDeclarationsOfName) {
                    currentScopeFirstDeclarationsOfName = /* @__PURE__ */ new Map();
                }
                const name = declaredNameInScope(node);
                if (!currentScopeFirstDeclarationsOfName.has(name)) {
                    currentScopeFirstDeclarationsOfName.set(name, node);
                }
            }