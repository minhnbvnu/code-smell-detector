function inspectExperimentalPragmaStatement(emitted) {
            if (emitted.exit) {
                return;
            }

            const { node } = emitted,
                nodesAllowedAbove = ["ExperimentalPragmaStatement", "PragmaStatement"],
                programNode = context.getSourceCode().getParent(node);

            for (let childNode of programNode.body) {
                // If we've reached this exp. pragma while traversing body, it means its position is fine.
                if (node.start === childNode.start) {
                    return;
                }

                // We found the first node not allowed above experimental pragma, report and exit.
                const pragmaCode = context.getSourceCode().getText(node);

                if (nodesAllowedAbove.indexOf(childNode.type) < 0) {
                    const errObject = {
                        node,
                        fix(fixer) {
                            return [fixer.remove(node),
                                fixer.insertTextBefore(childNode, `${pragmaCode}${EOL}`)];
                        },
                        message: "Experimental Pragma must precede everything except Solidity Pragma."
                    };

                    return context.report(errObject);
                }
            }
        }