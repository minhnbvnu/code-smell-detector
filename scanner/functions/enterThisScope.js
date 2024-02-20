function enterThisScope(node) {
                const strict = context.getScope().isStrict;
                funcInfo = {
                    upper: funcInfo,
                    node,
                    strict,
                    isTopLevelOfScript: false,
                    defaultThis: false,
                    initialized: strict
                };
            }