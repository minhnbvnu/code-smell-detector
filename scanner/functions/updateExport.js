function updateExport(changes, program, sourceFile, node, names) {
            const namedExports = node.exportClause && isNamedExports(node.exportClause) ? node.exportClause.elements : factory.createNodeArray([]);
            const allowTypeModifier = !node.isTypeOnly && !!(getIsolatedModules(program.getCompilerOptions()) || find(namedExports, (e) => e.isTypeOnly));
            changes.replaceNode(sourceFile, node, factory.updateExportDeclaration(node, node.modifiers, node.isTypeOnly, factory.createNamedExports(factory.createNodeArray([...namedExports, ...createExportSpecifiers(names, allowTypeModifier)], 
            /*hasTrailingComma*/
            namedExports.hasTrailingComma)), node.moduleSpecifier, node.assertClause));
        }