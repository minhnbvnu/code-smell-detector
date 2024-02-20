function attachFileToDiagnostic(diagnostic, file) {
            const fileName = file.fileName || "";
            const length2 = file.text.length;
            Debug.assertEqual(diagnostic.fileName, fileName);
            Debug.assertLessThanOrEqual(diagnostic.start, length2);
            Debug.assertLessThanOrEqual(diagnostic.start + diagnostic.length, length2);
            const diagnosticWithLocation = {
                file,
                start: diagnostic.start,
                length: diagnostic.length,
                messageText: diagnostic.messageText,
                category: diagnostic.category,
                code: diagnostic.code,
                reportsUnnecessary: diagnostic.reportsUnnecessary
            };
            if (diagnostic.relatedInformation) {
                diagnosticWithLocation.relatedInformation = [];
                for (const related of diagnostic.relatedInformation) {
                    if (isDiagnosticWithDetachedLocation(related) && related.fileName === fileName) {
                        Debug.assertLessThanOrEqual(related.start, length2);
                        Debug.assertLessThanOrEqual(related.start + related.length, length2);
                        diagnosticWithLocation.relatedInformation.push(attachFileToDiagnostic(related, file));
                    }
                    else {
                        diagnosticWithLocation.relatedInformation.push(related);
                    }
                }
            }
            return diagnosticWithLocation;
        }