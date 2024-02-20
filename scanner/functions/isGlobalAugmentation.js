function isGlobalAugmentation(scope) {
                return ((scope.type === scope_manager_1.ScopeType.tsModule && !!scope.block.global) ||
                    (!!scope.upper && isGlobalAugmentation(scope.upper)));
            }