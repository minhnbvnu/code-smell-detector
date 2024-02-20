function inspectAssignmentExpression(emitted) {
            /**
			 * node.operator is refined here by adding backslash before all the 'special' characters.
			 * 'special' chars are thos chars that are part of solidity assignment operators and, if used without backslash in JS RegExp,
			 * behave as wildcard characters. So to make sure they're treated as simple strings, we add '\' before them.
			 * As of today, these chars include: * / + | ^
			 */
            let node = emitted.node,
                op = node.operator.replace(/([\+\*\/\|\^])/g, "\\$1"), opLength = node.operator.length;

            if (emitted.exit) {
                return;
            }

            // If expression is 'abc *= def;', then charsAfterLeftNode will contain ' *= d'.
            let charsAfterLeftNode = sourceCode.getNextChars(node.left, 3 + opLength),
                validationRegexp = new RegExp("^ " + op + " [^\\s]$");

            (!validationRegexp.test(charsAfterLeftNode)) && context.report({
                node: node.left,
                message: "Assignment operator must have exactly single space on both sides of it."
            });
        }