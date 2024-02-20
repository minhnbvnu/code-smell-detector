function inspectDeclaration(emitted) {
            let node = emitted.node;

            if (emitted.exit) {
                return;
            }

            if (!node.is_constant && !mixedCaseRegEx.test(node.name)) {
                report(node, node.name);
            }
        }