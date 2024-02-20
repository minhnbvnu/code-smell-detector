function reportItem(node, name, info) {
            context.report({
                node,
                loc: node.loc,
                message:
                    "{{name}} was deprecated since v{{version}}{{replace}}.",
                data: {
                    name,
                    version: info.since,
                    replace: toReplaceMessage(info.replacedBy, version),
                },
            })
        }