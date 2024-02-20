function createExportMemberAssignmentStatement(node) {
                const expression = factory2.createAssignment(factory2.getExternalModuleOrNamespaceExportName(currentNamespaceContainerName, node, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true), factory2.getLocalName(node));
                setSourceMapRange(expression, createRange(node.name ? node.name.pos : node.pos, node.end));
                const statement = factory2.createExpressionStatement(expression);
                setSourceMapRange(statement, createRange(-1, node.end));
                return statement;
            }