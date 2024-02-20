function isGrouped(declarations) {
                const found = {};
                declarations.forEach(declaration => {
                    if (getDeclarationType(declaration.init) === DECL_REQUIRE) {
                        found[inferModuleType(declaration.init)] = true;
                    }
                });
                return Object.keys(found).length <= 1;
            }