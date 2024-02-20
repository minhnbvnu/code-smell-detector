function getDiagnostics2(sourceFile, ct) {
                try {
                    cancellationToken = ct;
                    return getDiagnosticsWorker(sourceFile);
                }
                finally {
                    cancellationToken = void 0;
                }
            }