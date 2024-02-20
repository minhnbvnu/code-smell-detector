function enterName() {
                Debug.assert((top == null ? void 0 : top.kind) === "class-element", "Incorrect value for top.kind.", () => `Expected top.kind to be 'class-element' but got '${top == null ? void 0 : top.kind}' instead.`);
                top = { kind: "name", next: top };
                updateState();
            }