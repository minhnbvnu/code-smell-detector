function reserveNameInNestedScopes(name) {
                if (!reservedNames || reservedNames === lastOrUndefined(reservedNamesStack)) {
                    reservedNames = /* @__PURE__ */ new Set();
                }
                reservedNames.add(name);
            }