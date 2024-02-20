function reportAccessingEval(globalScope) {
                const variable = astUtils.getVariableByName(globalScope, "eval");
                if (!variable) {
                    return;
                }
                const references = variable.references;
                for (let i = 0; i < references.length; ++i) {
                    const reference = references[i];
                    const id = reference.identifier;
                    if (id.name === "eval" && !astUtils.isCallee(id)) {
                        // Is accessing to eval (excludes direct calls to eval)
                        report(id);
                    }
                }
            }