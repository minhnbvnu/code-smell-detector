function tryFileLookup(fileName, onlyRecordFailures, state) {
            if (!onlyRecordFailures) {
                if (state.host.fileExists(fileName)) {
                    if (state.traceEnabled) {
                        trace(state.host, Diagnostics.File_0_exists_use_it_as_a_name_resolution_result, fileName);
                    }
                    return fileName;
                }
                else {
                    if (state.traceEnabled) {
                        trace(state.host, Diagnostics.File_0_does_not_exist, fileName);
                    }
                }
            }
            state.failedLookupLocations.push(fileName);
            return void 0;
        }