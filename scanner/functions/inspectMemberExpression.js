function inspectMemberExpression(emitted) {
            let node = emitted.node,
                property = node.property;

            /**
			 * If expression spans over multiple lines, below rule doesn't apply
			 * eg- myArray [
			 *         fooBar ()
			 *             .getIndex ()
			 *             .toBase10 ()
			 * 	   ];
			 */
            if (emitted.exit || (sourceCode.getLine(node) !== sourceCode.getEndingLine(property)) || !node.computed) {
                return;
            }

            let charBeforeProperty = sourceCode.getPrevChar(property),
                charAfterProperty = sourceCode.getNextChar(property);

            (charBeforeProperty !== "[") && context.report({
                node: property,
                location: {
                    column: sourceCode.getColumn(property) - 1
                },
                message: "There should be no whitespace or comments between '[' and property."
            });

            (charAfterProperty !== "]") && context.report({
                node: property,
                location: {
                    column: sourceCode.getEndingColumn(property) + 1
                },
                message: "There should be no whitespace or comments between property and ']'."
            });
        }