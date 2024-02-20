function enterClassElement(node) {
                var _a2, _b;
                Debug.assert((top == null ? void 0 : top.kind) === "class", "Incorrect value for top.kind.", () => `Expected top.kind to be 'class' but got '${top == null ? void 0 : top.kind}' instead.`);
                top = { kind: "class-element", next: top };
                if (isClassStaticBlockDeclaration(node) || isPropertyDeclaration(node) && hasStaticModifier(node)) {
                    top.classThis = (_a2 = top.next.classInfo) == null ? void 0 : _a2.classThis;
                    top.classSuper = (_b = top.next.classInfo) == null ? void 0 : _b.classSuper;
                }
                updateState();
            }