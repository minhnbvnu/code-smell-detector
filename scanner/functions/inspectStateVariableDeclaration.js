function inspectStateVariableDeclaration(emitted) {
            let node = emitted.node;

            if (emitted.exit) {
                return;
            }

            node.is_constant && !upperCaseRegEx.test(node.name) && reportNode(node);
        }