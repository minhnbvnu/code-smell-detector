function inspectWithStatement(emitted) {
            if (emitted.exit) {
                return;
            }
			
            context.report({
                node: emitted.node,
                message: "Use of 'with' statement"
            });
        }