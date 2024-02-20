function forEachPossibleImportOrExportStatement(sourceFileLike, action) {
            return forEach(sourceFileLike.kind === 308 /* SourceFile */ ? sourceFileLike.statements : sourceFileLike.body.statements, (statement) => (
            // TODO: GH#18217
            action(statement) || isAmbientModuleDeclaration(statement) && forEach(statement.body && statement.body.statements, action)));
        }