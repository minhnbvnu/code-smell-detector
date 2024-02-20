function isReferenceToGlobalVariable(node) {
                const variable = globalScope.set.get(node.name);
                return variable && variable.defs.length === 0 &&
                    variable.references.some(ref => ref.identifier === node);
            }