function retryAfter(promise) {
        var err = new Error('MathJax retry');
        err.retry = promise;
        throw err;
    }