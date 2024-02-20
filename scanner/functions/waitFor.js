function waitFor(test, callback) {
        var intervalId = window.setInterval(function() {
            if (test()) {
                window.clearInterval(intervalId);
                callback();
            }
        }, 100);
    }