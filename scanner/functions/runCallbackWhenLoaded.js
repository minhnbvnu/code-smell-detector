function runCallbackWhenLoaded() {
                if (Object.isFrozen(spritesheet)) {
                    callback(spritesheet);
                    loadManager.markRequestCompleted(jsonURL + ' callback', '', true);
                } else {
                    // Re-queue a test after a few milliseconds
                    setTimeout(runCallbackWhenLoaded, 8);
                }
            }