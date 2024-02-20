function getMethodKey(node) {
                let key = sourceCode.getText(node.key);
                if (node.computed) {
                    key = `[${key}]`;
                }
                if (node.optional) {
                    key = `${key}?`;
                }
                if (node.readonly) {
                    key = `readonly ${key}`;
                }
                return key;
            }