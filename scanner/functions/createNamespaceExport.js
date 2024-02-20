function createNamespaceExport(exportName, exportValue, location) {
                return setTextRange(factory2.createExpressionStatement(factory2.createAssignment(factory2.getNamespaceMemberName(currentNamespaceContainerName, exportName, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true), exportValue)), location);
            }