function reportPragmaDiagnostic(pos, end, diagnostic) {
                            parseDiagnostics.push(createDetachedDiagnostic(fileName, pos, end, diagnostic));
                        }