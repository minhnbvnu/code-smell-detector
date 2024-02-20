function inspectFuncOrModif(emitted) {
            let node = emitted.node;

            /**
             * If node's parent is contract / library and node is either a modifier (which means Inheritance),
             * do not apply mixedcase
             */
            if (emitted.exit ||
                ((node.parent.type === "ContractStatement" || node.parent.type === "LibraryStatement") &&
                (node.type === "FunctionDeclaration" && node.parent.name === node.name))
            ) {
                return;
            }

            if (!mixedCaseRegEx.test(node.name)) {
                report(node, node.name);
            }
        }