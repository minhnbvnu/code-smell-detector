function createExportStatement(name, value, allowComments) {
                const statement = factory2.createExpressionStatement(createExportExpression(name, value));
                startOnNewLine(statement);
                if (!allowComments) {
                    setEmitFlags(statement, 3072 /* NoComments */);
                }
                return statement;
            }