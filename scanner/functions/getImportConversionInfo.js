function getImportConversionInfo(context, considerPartialSpans = true) {
            const { file } = context;
            const span = getRefactorContextSpan(context);
            const token = getTokenAtPosition(file, span.start);
            const importDecl = considerPartialSpans ? findAncestor(token, isImportDeclaration) : getParentNodeInSpan(token, file, span);
            if (!importDecl || !isImportDeclaration(importDecl))
                return { error: "Selection is not an import declaration." };
            const end = span.start + span.length;
            const nextToken = findNextToken(importDecl, importDecl.parent, file);
            if (nextToken && end > nextToken.getStart())
                return void 0;
            const { importClause } = importDecl;
            if (!importClause) {
                return { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_import_clause) };
            }
            if (!importClause.namedBindings) {
                return { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_namespace_import_or_named_imports) };
            }
            if (importClause.namedBindings.kind === 271 /* NamespaceImport */) {
                return { convertTo: 0 /* Named */, import: importClause.namedBindings };
            }
            const shouldUseDefault = getShouldUseDefault(context.program, importClause);
            return shouldUseDefault ? { convertTo: 1 /* Default */, import: importClause.namedBindings } : { convertTo: 2 /* Namespace */, import: importClause.namedBindings };
        }