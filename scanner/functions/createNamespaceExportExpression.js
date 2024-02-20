function createNamespaceExportExpression(exportName, exportValue, location) {
                return setTextRange(factory2.createAssignment(getNamespaceMemberNameWithSourceMapsAndWithoutComments(exportName), exportValue), location);
            }