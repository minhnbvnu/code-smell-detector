function triggerSuccess (k, val, primKey) {
            if (advanceState) {
                if (me.__advanceCount && me.__advanceCount >= 2 && k !== undefined) {
                    me.__advanceCount--;
                    me.__key = k;
                    me.__continue(undefined, true);
                    /** @type {() => void} */ (
                        executeNextRequest
                    )(); // We don't call success yet but do need to advance the transaction queue
                    return;
                }
                me.__advanceCount = undefined;
            }
            me.__onsuccess(success)(k, val, primKey);
        }