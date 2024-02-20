function appendExportStatement(statements, exportName, expression, allowComments) {
                statements = append(statements, createExportStatement(exportName, expression, allowComments));
                return statements;
            }