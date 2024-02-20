function doChange33(exportingSourceFile, program, info, changes, cancellationToken) {
            changeExport(exportingSourceFile, info, changes, program.getTypeChecker());
            changeImports(program, info, changes, cancellationToken);
        }