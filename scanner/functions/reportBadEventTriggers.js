function reportBadEventTriggers(emitted) {
        if (!emitted.exit) {
            return;
        }

        callExpressions.forEach(node => {
            isEvent(node, events) && context.report({
                node,
                fix(fixer) {
                    return fixer.insertTextBefore(node, "emit ");
                },
                message: "Use emit statements for triggering events."
            });
        });
    }