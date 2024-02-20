function enterOther() {
                if ((top == null ? void 0 : top.kind) === "other") {
                    Debug.assert(!pendingExpressions);
                    top.depth++;
                }
                else {
                    top = { kind: "other", next: top, depth: 0, savedPendingExpressions: pendingExpressions };
                    pendingExpressions = void 0;
                    updateState();
                }
            }