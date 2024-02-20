function isInTdz(variable, scopeVar) {
                const outerDef = scopeVar.defs[0];
                const inner = getNameRange(variable);
                const outer = getNameRange(scopeVar);
                return !!(inner &&
                    outer &&
                    inner[1] < outer[0] &&
                    // Excepts FunctionDeclaration if is {"hoist":"function"}.
                    (options.hoist !== 'functions' ||
                        !outerDef ||
                        outerDef.node.type !== utils_1.AST_NODE_TYPES.FunctionDeclaration));
            }