function writeStatement(statement) {
                if (statement) {
                    if (!statements) {
                        statements = [statement];
                    }
                    else {
                        statements.push(statement);
                    }
                }
            }