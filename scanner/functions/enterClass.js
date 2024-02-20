function enterClass(classInfo2) {
                top = { kind: "class", next: top, classInfo: classInfo2, savedPendingExpressions: pendingExpressions };
                pendingExpressions = void 0;
                updateState();
            }