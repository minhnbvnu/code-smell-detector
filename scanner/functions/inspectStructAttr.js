function inspectStructAttr(structIndent, structIndentDesc, attr) {
                let indentRegExp = new RegExp("^" + structIndent + "[^\\s(\/\*)]"),
                    attrLineText = sourceCode.getTextOnLine(sourceCode.getLine(attr));

                //attribute declaration must be preceded by only correct level of indentation & no comments
                !indentRegExp.test(attrLineText) && context.report({
                    node: attr,
                    message: `Only use indent of ${structIndentDesc}.`
                });
            }