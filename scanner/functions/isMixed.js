function isMixed(declarations) {
                const contains = {};
                declarations.forEach(declaration => {
                    const type = getDeclarationType(declaration.init);
                    contains[type] = true;
                });
                return !!(contains[DECL_REQUIRE] &&
                    (contains[DECL_UNINITIALIZED] || contains[DECL_OTHER]));
            }