function assertDiagnosticLocation(file, start, length2) {
            Debug.assertGreaterThanOrEqual(start, 0);
            Debug.assertGreaterThanOrEqual(length2, 0);
            if (file) {
                Debug.assertLessThanOrEqual(start, file.text.length);
                Debug.assertLessThanOrEqual(start + length2, file.text.length);
            }
        }