function handleRest() {
            if (hars.length + harps.length === 0) {
                done();
                return;
            }

            // Asynchronously load other HAR files (jQuery doesn't like it synchronously).
            setTimeout(function() {
                loader.loadArchives(hars, harps,
                    callbackName, callback, errorCallback, doneCallback);
            }, 300);
        }