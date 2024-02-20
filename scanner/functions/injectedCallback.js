function injectedCallback() {
        if (!timedOut) {
            originalCallback.apply(null, arguments);
            clearTimeout(timer);
        }
    }