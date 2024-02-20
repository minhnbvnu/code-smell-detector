function requestsFinished () {
        me.__active = false;
        me.__requestsFinished = true;

        /**
         * @throws {Error}
         * @returns {void}
         */
        function complete () {
            me.__completed = true;
            if (CFG.DEBUG) { console.log('Transaction completed'); }
            const evt = createEvent('complete');
            try {
                me.__internal = true;
                me.dispatchEvent(evt);
                me.__internal = false;
                me.dispatchEvent(createEvent('__complete'));
            } catch (e) {
                me.__internal = false;
                // An error occurred in the "oncomplete" handler.
                // It's too late to call "onerror" or "onabort". Throw a global error instead.
                // (this may seem odd/bad, but it's how all native IndexedDB implementations work)
                me.__errored = true;
                throw e;
            } finally {
                me.__storeHandles = {};
            }
        }
        if (me.mode === 'readwrite') {
            if (me.__transactionFinished) {
                complete();
                return;
            }
            me.__transactionEndCallback = complete;
            return;
        }
        if (me.mode === 'readonly') {
            complete();
            return;
        }
        const ev = /** @type {Event & {complete: () => void}} */ (
            createEvent('__beforecomplete')
        );
        ev.complete = complete;
        me.dispatchEvent(ev);
    }