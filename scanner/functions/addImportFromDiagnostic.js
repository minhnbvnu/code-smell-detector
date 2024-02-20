function addImportFromDiagnostic(diagnostic, context) {
                const info = getFixInfos(context, diagnostic.code, diagnostic.start, useAutoImportProvider);
                if (!info || !info.length)
                    return;
                addImport(first(info));
            }