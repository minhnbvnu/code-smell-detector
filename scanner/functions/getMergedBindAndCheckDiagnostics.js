function getMergedBindAndCheckDiagnostics(sourceFile, includeBindAndCheckDiagnostics, ...allDiagnostics) {
                var _a3;
                const flatDiagnostics = flatten(allDiagnostics);
                if (!includeBindAndCheckDiagnostics || !((_a3 = sourceFile.commentDirectives) == null ? void 0 : _a3.length)) {
                    return flatDiagnostics;
                }
                const { diagnostics, directives } = getDiagnosticsWithPrecedingDirectives(sourceFile, sourceFile.commentDirectives, flatDiagnostics);
                for (const errorExpectation of directives.getUnusedExpectations()) {
                    diagnostics.push(createDiagnosticForRange(sourceFile, errorExpectation.range, Diagnostics.Unused_ts_expect_error_directive));
                }
                return diagnostics;
            }