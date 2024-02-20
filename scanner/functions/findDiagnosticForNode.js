function findDiagnosticForNode(node, sortedFileDiagnostics) {
            const span = createTextSpanFromNode(node);
            const index = binarySearchKey(sortedFileDiagnostics, span, identity, compareTextSpans);
            if (index >= 0) {
                const diagnostic = sortedFileDiagnostics[index];
                Debug.assertEqual(diagnostic.file, node.getSourceFile(), "Diagnostics proided to 'findDiagnosticForNode' must be from a single SourceFile");
                return cast(diagnostic, isDiagnosticWithLocation);
            }
        }