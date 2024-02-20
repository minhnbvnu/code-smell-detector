function inspectNameValueAssignment(emitted) {
            if (emitted.exit) {
                return;
            }

            let node = emitted.node,
                codeBetweenNameAndValue = sourceCode.getStringBetweenNodes(node.name, node.value);
            let validationRegexp = /^((: )|(:)|( : ))$/;

            (!validationRegexp.test(codeBetweenNameAndValue)) && context.report({
                location: {
                    column: sourceCode.getColumn(node.name) + 1
                },

                node: node,
                message: ("Name '" + node.name.name +
					"': Only \"N: V\", \"N : V\" or \"N:V\" spacing style should be used in Name-Value Mapping.")
            });

            //If this is not the last node of its parent array, ensure the comma spacing is acceptable
            let parentArray = node.parent.arguments;

            if (node.start === parentArray.slice(-1) [0].start) {
                return;
            }

            let escapedEOL = jse(EOL),
                codeAfterCurrentAssignment = sourceCode.getNextChars(node.value, 3);

            // thirdCharRegexp is used in validationRegExp if EOL is unix-style, ie, len(EOL) = 1.
            // If len(EOL) is 2, then comma + EOL cover 3 chars, then thirdCharRegexp gets treated as a checked for 4th character,
            // resulting in false positive.
            const thirdCharRegexp = `[^${escapedEOL}\\/]`;
            validationRegexp = new RegExp(
                `^((,[^ ${escapedEOL}\\/].)|(, [^ ${escapedEOL}\\/])|(,${escapedEOL}${EOL.length === 1 ? thirdCharRegexp : ""}))$`
            );

            (!validationRegexp.test(codeAfterCurrentAssignment)) && context.report({
                location: {
                    column: sourceCode.getEndingColumn(node.value) + 1
                },

                node: node,
                message: "\"" + sourceCode.getText(node.value) + "\" should be immediately followed by a comma, then an optional space."
            });
        }