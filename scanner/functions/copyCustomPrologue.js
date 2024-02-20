function copyCustomPrologue(source, target, statementOffset, visitor, filter2 = returnTrue) {
                const numStatements = source.length;
                while (statementOffset !== void 0 && statementOffset < numStatements) {
                    const statement = source[statementOffset];
                    if (getEmitFlags(statement) & 2097152 /* CustomPrologue */ && filter2(statement)) {
                        append(target, visitor ? visitNode(statement, visitor, isStatement) : statement);
                    }
                    else {
                        break;
                    }
                    statementOffset++;
                }
                return statementOffset;
            }