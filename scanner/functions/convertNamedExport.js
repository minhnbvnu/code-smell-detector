function convertNamedExport(sourceFile, assignment, changes, exports) {
            const { text } = assignment.left.name;
            const rename = exports.get(text);
            if (rename !== void 0) {
                const newNodes = [
                    makeConst(
                    /*modifiers*/
                    void 0, rename, assignment.right),
                    makeExportDeclaration([factory.createExportSpecifier(
                        /*isTypeOnly*/
                        false, rename, text)])
                ];
                changes.replaceNodeWithNodes(sourceFile, assignment.parent, newNodes);
            }
            else {
                convertExportsPropertyAssignment(assignment, sourceFile, changes);
            }
        }