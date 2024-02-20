function visitNamedExports(node, allowEmpty) {
                const elements = visitNodes2(node.elements, visitExportSpecifier, isExportSpecifier);
                return allowEmpty || some(elements) ? factory2.updateNamedExports(node, elements) : void 0;
            }