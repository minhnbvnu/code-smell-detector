function* collect_classes(ast) {
            const { stylesheet } = ast;
            if (stylesheet == null)
                return;
            for (const rule of stylesheet.rules) {
                if (rule.type == "rule") {
                    const { selectors } = rule;
                    for (const selector of selectors ?? []) {
                        const classes = selector.match(/\.[A-Za-z0-9_-]+/g);
                        if (classes != null) {
                            for (const cls of classes) {
                                yield cls.substring(1);
                            }
                        }
                    }
                }
            }
        }