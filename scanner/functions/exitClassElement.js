function exitClassElement() {
                var _a2;
                Debug.assert((top == null ? void 0 : top.kind) === "class-element", "Incorrect value for top.kind.", () => `Expected top.kind to be 'class-element' but got '${top == null ? void 0 : top.kind}' instead.`);
                Debug.assert(((_a2 = top.next) == null ? void 0 : _a2.kind) === "class", "Incorrect value for top.next.kind.", () => {
                    var _a3;
                    return `Expected top.next.kind to be 'class' but got '${(_a3 = top.next) == null ? void 0 : _a3.kind}' instead.`;
                });
                top = top.next;
                updateState();
            }