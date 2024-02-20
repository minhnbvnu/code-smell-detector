function inspectParam(paramIndent, paramIndentDesc, param) {
                let indentRegExp = new RegExp("^" + paramIndent + "[^\\s(\/\*)]"),
                    paramLineText = sourceCode.getTextOnLine(sourceCode.getLine(param));

                //parameter declaration must be preceded by only correct level of indentation & no comments
                !indentRegExp.test(paramLineText) && context.report({
                    node: param,
                    message: `Only use indent of ${paramIndentDesc}.`
                });
            }