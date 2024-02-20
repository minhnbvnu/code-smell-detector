function reservePrivateNameInNestedScopes(name) {
                if (!reservedPrivateNames || reservedPrivateNames === lastOrUndefined(reservedPrivateNamesStack)) {
                    reservedPrivateNames = /* @__PURE__ */ new Set();
                }
                reservedPrivateNames.add(name);
            }