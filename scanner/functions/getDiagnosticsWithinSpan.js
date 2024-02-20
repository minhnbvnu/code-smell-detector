function getDiagnosticsWithinSpan(span, sortedFileDiagnostics) {
            var _a2;
            let index = binarySearchKey(sortedFileDiagnostics, span.start, (diag2) => diag2.start, compareValues);
            if (index < 0) {
                index = ~index;
            }
            while (((_a2 = sortedFileDiagnostics[index - 1]) == null ? void 0 : _a2.start) === span.start) {
                index--;
            }
            const result = [];
            const end = textSpanEnd(span);
            while (true) {
                const diagnostic = tryCast(sortedFileDiagnostics[index], isDiagnosticWithLocation);
                if (!diagnostic || diagnostic.start > end) {
                    break;
                }
                if (textSpanContainsTextSpan(span, diagnostic)) {
                    result.push(diagnostic);
                }
                index++;
            }
            return result;
        }