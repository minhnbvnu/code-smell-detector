function visitNamedExportBindings(node, allowEmpty) {
                return isNamespaceExport(node) ? visitNamespaceExports(node) : visitNamedExports(node, allowEmpty);
            }