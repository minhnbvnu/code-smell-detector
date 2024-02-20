function getModuleInstanceStateForAliasTarget(specifier, visited) {
            const name = specifier.propertyName || specifier.name;
            let p = specifier.parent;
            while (p) {
                if (isBlock(p) || isModuleBlock(p) || isSourceFile(p)) {
                    const statements = p.statements;
                    let found;
                    for (const statement of statements) {
                        if (nodeHasName(statement, name)) {
                            if (!statement.parent) {
                                setParent(statement, p);
                                setParentRecursive(statement, 
                                /*incremental*/
                                false);
                            }
                            const state = getModuleInstanceStateCached(statement, visited);
                            if (found === void 0 || state > found) {
                                found = state;
                            }
                            if (found === 1 /* Instantiated */) {
                                return found;
                            }
                        }
                    }
                    if (found !== void 0) {
                        return found;
                    }
                }
                p = p.parent;
            }
            return 1 /* Instantiated */;
        }