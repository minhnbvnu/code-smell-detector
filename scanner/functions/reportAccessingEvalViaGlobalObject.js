function reportAccessingEvalViaGlobalObject(globalScope) {
                for (let i = 0; i < candidatesOfGlobalObject.length; ++i) {
                    const name = candidatesOfGlobalObject[i];
                    const variable = astUtils.getVariableByName(globalScope, name);
                    if (!variable) {
                        continue;
                    }
                    const references = variable.references;
                    for (let j = 0; j < references.length; ++j) {
                        const identifier = references[j].identifier;
                        let node = identifier.parent;
                        // To detect code like `window.window.eval`.
                        while (isMember(node, name)) {
                            node = node.parent;
                        }
                        // Reports.
                        if (isMember(node, "eval")) {
                            report(node);
                        }
                    }
                }
            }