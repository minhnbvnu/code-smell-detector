function checkTypeImport(node) {
                if (node.source) {
                    const value = node.source.value;
                    const isMemberImport = isAllMemberImport(node);
                    if (isMemberImport
                        ? typeMemberImports.has(value)
                        : typeDefaultImports.has(value)) {
                        report('importType', node, value);
                    }
                    if (includeExports && typeExports.has(value)) {
                        report('importTypeAs', node, value);
                    }
                    if (isMemberImport) {
                        typeMemberImports.add(value);
                    }
                    else {
                        typeDefaultImports.add(value);
                    }
                }
            }