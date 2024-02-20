function onLoadFailure() {
            if (LM.status === 'failure') { return; }
            rawEntry.status = 'failure';

            let atLeastOne = false;
            let allTrue = true;
            // Run all failure callbacks
            for (let [p, v] of rawEntry.post) {
                for (let c of v.errorCallbackArray) {
                    if (c) {
                        atLeastOne = true;
                        allTrue = c(rawEntry.failureMessage, rawEntry.url) && allTrue;
                    }
                } // for each callback
            }

            // Do we treat this as a 'success'?
            const considerSuccess = atLeastOne && allTrue;
            
            LM.markRequestCompleted(rawEntry.url, rawEntry.failureMessage, considerSuccess);
        }