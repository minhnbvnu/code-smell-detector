function executeNextRequest () {
                if (me.__errored || me.__requestsFinished) {
                    // We've already called "onerror", "onabort", or thrown within the transaction, so don't do it again.
                    return;
                }
                i++;
                if (i >= me.__requests.length) {
                    // All requests in the transaction are done
                    me.__requests = [];
                    if (me.__active) {
                        requestsFinished();
                    }
                } else {
                    try {
                        q = me.__requests[i];
                        if (!q.req) {
                            q.op(tx, q.args, executeNextRequest, error);
                            return;
                        }
                        if (q.req.__done) { // Avoid continuing with aborted requests
                            return;
                        }
                        q.op(tx, q.args, success, error, executeNextRequest);
                    } catch (e) {
                        error(/** @type {Error} */ (e));
                    }
                }
            }