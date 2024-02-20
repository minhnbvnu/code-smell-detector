function copyStandardPrologue(source, target, statementOffset = 0, ensureUseStrict2) {
                Debug.assert(target.length === 0, "Prologue directives should be at the first statement in the target statements array");
                let foundUseStrict = false;
                const numStatements = source.length;
                while (statementOffset < numStatements) {
                    const statement = source[statementOffset];
                    if (isPrologueDirective(statement)) {
                        if (isUseStrictPrologue2(statement)) {
                            foundUseStrict = true;
                        }
                        target.push(statement);
                    }
                    else {
                        break;
                    }
                    statementOffset++;
                }
                if (ensureUseStrict2 && !foundUseStrict) {
                    target.push(createUseStrictPrologue());
                }
                return statementOffset;
            }