function exitClass() {
                Debug.assert((top == null ? void 0 : top.kind) === "class", "Incorrect value for top.kind.", () => `Expected top.kind to be 'class' but got '${top == null ? void 0 : top.kind}' instead.`);
                pendingExpressions = top.savedPendingExpressions;
                top = top.next;
                updateState();
            }