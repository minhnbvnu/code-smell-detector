function createDiagnosticCollection() {
            let nonFileDiagnostics = [];
            const filesWithDiagnostics = [];
            const fileDiagnostics = /* @__PURE__ */ new Map();
            let hasReadNonFileDiagnostics = false;
            return {
                add,
                lookup,
                getGlobalDiagnostics,
                getDiagnostics: getDiagnostics2
            };
            function lookup(diagnostic) {
                let diagnostics;
                if (diagnostic.file) {
                    diagnostics = fileDiagnostics.get(diagnostic.file.fileName);
                }
                else {
                    diagnostics = nonFileDiagnostics;
                }
                if (!diagnostics) {
                    return void 0;
                }
                const result = binarySearch(diagnostics, diagnostic, identity, compareDiagnosticsSkipRelatedInformation);
                if (result >= 0) {
                    return diagnostics[result];
                }
                return void 0;
            }
            function add(diagnostic) {
                let diagnostics;
                if (diagnostic.file) {
                    diagnostics = fileDiagnostics.get(diagnostic.file.fileName);
                    if (!diagnostics) {
                        diagnostics = [];
                        fileDiagnostics.set(diagnostic.file.fileName, diagnostics);
                        insertSorted(filesWithDiagnostics, diagnostic.file.fileName, compareStringsCaseSensitive);
                    }
                }
                else {
                    if (hasReadNonFileDiagnostics) {
                        hasReadNonFileDiagnostics = false;
                        nonFileDiagnostics = nonFileDiagnostics.slice();
                    }
                    diagnostics = nonFileDiagnostics;
                }
                insertSorted(diagnostics, diagnostic, compareDiagnosticsSkipRelatedInformation);
            }
            function getGlobalDiagnostics() {
                hasReadNonFileDiagnostics = true;
                return nonFileDiagnostics;
            }
            function getDiagnostics2(fileName) {
                if (fileName) {
                    return fileDiagnostics.get(fileName) || [];
                }
                const fileDiags = flatMapToMutable(filesWithDiagnostics, (f) => fileDiagnostics.get(f));
                if (!nonFileDiagnostics.length) {
                    return fileDiags;
                }
                fileDiags.unshift(...nonFileDiagnostics);
                return fileDiags;
            }
        }