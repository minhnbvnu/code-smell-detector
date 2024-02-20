function exitName() {
                Debug.assert((top == null ? void 0 : top.kind) === "name", "Incorrect value for top.kind.", () => `Expected top.kind to be 'name' but got '${top == null ? void 0 : top.kind}' instead.`);
                top = top.next;
                updateState();
            }