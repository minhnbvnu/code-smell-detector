function checkOmittedQuotes(node) {
                const key = node.key;
                if (!node.method && !node.computed && !node.shorthand && !(key.type === "Literal" && typeof key.value === "string")) {
                    context.report({
                        node,
                        messageId: "unquotedPropertyFound",
                        data: { property: key.name || key.value },
                        fix: fixer => fixer.replaceText(key, getQuotedKey(key))
                    });
                }
            }