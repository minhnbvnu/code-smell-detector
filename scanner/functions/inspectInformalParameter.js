function inspectInformalParameter(emitted) {
            let node = emitted.node;

            if (emitted.exit) {
                return;
            }

            /**
			 * node.is could either be an object containing "name" or null.
			 * It is null when there is no name (eg- `function foo() returns(bool) {}`)
			 * Here, bool's node will have "literal" object but "id" as null.
			 */
            if (node.id && !mixedCaseRegEx.test(node.id)) {
                report(node, node.id);
            }
        }