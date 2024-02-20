function hasDynamicExpressions(root) {
                let retv = false;
                Traverser.traverse(root, {
                    visitorKeys: sourceCode.visitorKeys,
                    enter(node) {
                        if (DYNAMIC_PATTERN.test(node.type)) {
                            retv = true;
                            this.break();
                        }
                        else if (SKIP_PATTERN.test(node.type)) {
                            this.skip();
                        }
                    }
                });
                return retv;
            }