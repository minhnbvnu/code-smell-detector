function httpIngest( isTargetUserSession, paths, comment) {
        DOMBridge.anywhere.getCurrentEditingSessionURL(function(sessionURL) {
            AnywhereHTTPApi.ingest( sessionURL, isTargetUserSession, paths, comment );
        });
    }