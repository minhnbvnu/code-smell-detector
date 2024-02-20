function getTypeExportSpecifiers(originExportSpecifier, context) {
            const exportClause = originExportSpecifier.parent;
            if (exportClause.elements.length === 1) {
                return exportClause.elements;
            }
            const diagnostics = getDiagnosticsWithinSpan(createTextSpanFromNode(exportClause), context.program.getSemanticDiagnostics(context.sourceFile, context.cancellationToken));
            return filter(exportClause.elements, (element) => {
                var _a2;
                return element === originExportSpecifier || ((_a2 = findDiagnosticForNode(element, diagnostics)) == null ? void 0 : _a2.code) === errorCodes13[0];
            });
        }