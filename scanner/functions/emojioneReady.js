function emojioneReady (fn) {
        if (emojione) {
            fn();
        } else {
            readyCallbacks.push(fn);
        }
    }