function onLoadSuccess() {
            if (LM.status === 'failure') { return; }

            try {
                // Run all post processing and success callbacks
                for (let [p, v] of rawEntry.post) {
                    v.value = p ? p(rawEntry.raw, rawEntry.url) : rawEntry.raw;
                    
                    for (let c of v.callbackArray) {
                        // Note that callbacks may trigger their own loads, which
                        // increase LM.pendingRequests
                        if (c) { c(v.value, rawEntry.raw, rawEntry.url, p); }
                    }
                }
                rawEntry.status = 'success';
                LM.markRequestCompleted(rawEntry.url, '', true);
            } catch (e) {
                // The load succeeded, but a callback has failed
                console.trace();
                console.log(e + ' while loading ' + url);
                rawEntry.failureMessage = '' + e;
                onLoadFailure();
            }
        }