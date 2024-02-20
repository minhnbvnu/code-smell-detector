function finishRecordingFilesWithChangedResolutions() {
                const collected = filesWithChangedSetOfUnresolvedImports;
                filesWithChangedSetOfUnresolvedImports = void 0;
                return collected;
            }