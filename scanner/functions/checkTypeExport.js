function checkTypeExport(node) {
                if (node.source) {
                    const value = node.source.value;
                    if (typeExports.has(value)) {
                        report('exportType', node, value);
                    }
                    if (typeMemberImports.has(value) || typeDefaultImports.has(value)) {
                        report('exportTypeAs', node, value);
                    }
                    typeExports.add(value);
                }
            }