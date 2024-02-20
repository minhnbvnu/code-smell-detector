function getGlobalDiagnostics() {
                return rootNames.length ? sortAndDeduplicateDiagnostics(getTypeChecker().getGlobalDiagnostics().slice()) : emptyArray;
            }