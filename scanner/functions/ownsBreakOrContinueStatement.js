function ownsBreakOrContinueStatement(owner, statement) {
                        const actualOwner = getBreakOrContinueOwner(statement);
                        return !!actualOwner && actualOwner === owner;
                    }