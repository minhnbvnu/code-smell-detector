function findSuperCallAndStatementIndex(originalBodyStatements, existingPrologue) {
                for (let i = existingPrologue.length; i < originalBodyStatements.length; i += 1) {
                    const superCall = getSuperCallFromStatement(originalBodyStatements[i]);
                    if (superCall) {
                        return {
                            superCall,
                            superStatementIndex: i
                        };
                    }
                }
                return {
                    superStatementIndex: -1
                };
            }