function exitOther() {
                Debug.assert((top == null ? void 0 : top.kind) === "other", "Incorrect value for top.kind.", () => `Expected top.kind to be 'other' but got '${top == null ? void 0 : top.kind}' instead.`);
                if (top.depth > 0) {
                    Debug.assert(!pendingExpressions);
                    top.depth--;
                }
                else {
                    pendingExpressions = top.savedPendingExpressions;
                    top = top.next;
                    updateState();
                }
            }