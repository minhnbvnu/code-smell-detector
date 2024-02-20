function getThrowStatementOwner(throwStatement) {
                        let child = throwStatement;
                        while (child.parent) {
                            const parent2 = child.parent;
                            if (isFunctionBlock(parent2) || parent2.kind === 308 /* SourceFile */) {
                                return parent2;
                            }
                            if (isTryStatement(parent2) && parent2.tryBlock === child && parent2.catchClause) {
                                return child;
                            }
                            child = parent2;
                        }
                        return void 0;
                    }