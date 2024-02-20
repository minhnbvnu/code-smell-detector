function waitForElement(selector, callback) {
        waitFor(function() {
            return !!$(selector).length;
        }, callback);
    }