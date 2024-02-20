function inspectConstructorDeclaration(emitted) {
            const { node } = emitted;

            if (!emitted.exit) {
                // Because parent of a node is not accessible during exit phase,
                // cache the parents of all constructors during entry so they
                // can be used during exit.
                enclosingContractsOfConstructors[node.start] = context.getSourceCode().getParent(node);
                return;
            }

            // No need to check the constructor currently being exited if it
            // isn't even flagged for empty block.
            if (!constructorsToCheckForBaseCall.includes(node.start)) {
                return;
            }

            // Run constructor inspection while exiting nodes.
            // By this time, the constructorsToCheckForBaseCall list has been
            // populated.
            const enclosingContract = enclosingContractsOfConstructors[node.start];

            // If node.modifiers is null, it means no modifiers exist for this
            // constructor and it should therefore be reported.
            for (let i = 0; i < (node.modifiers || []).length; i++) {
                const functionModif = node.modifiers[i].name;

                for (let j = 0; j < enclosingContract.is.length; j++) {
                    // The constructor is calling a base cons, no need
                    // to report it.
                    if (enclosingContract.is[j].name === functionModif) {
                        return;
                    }
                }
            }

            report(node.body);
        }