function inspectArrayExpression(emitted) {
            let node = emitted.node, elements = node.elements;
            let endingLineNum = sourceCode.getEndingLine(node),
                arrayExpressionLineText, currentIndent, currentIndentLevel;

            function inspectElement(arrayIndent, arrayIndentDesc, elem) {
                let indentRegExp = new RegExp("^" + arrayIndent + "[^\\s(\/\*)]"),
                    elemLineText = sourceCode.getTextOnLine(sourceCode.getLine(elem));

                //element declaration must be preceded by only correct level of indentation & no comments
                !indentRegExp.test(elemLineText) && context.report({
                    node: elem,
                    message: `Only use indent of ${arrayIndentDesc}.`
                });
            }

            // No need to lint further if entire arary declaration is on single line
            if (emitted.exit || sourceCode.getLine(node) === endingLineNum) {
                return;
            }

            arrayExpressionLineText = sourceCode.getTextOnLine(sourceCode.getLine(node));

            currentIndent = arrayExpressionLineText.slice(
                0,
                arrayExpressionLineText.indexOf(arrayExpressionLineText.trim())
            );

            currentIndentLevel = (currentIndent.match(BASE_INDENTATION_STYLE_REGEXP_GLOBAL) || []).length;

            //ensure that there is only whitespace of correct level on the line containing array expression
            if (getIndentString(BASE_INDENTATION_STYLE, currentIndentLevel) !== currentIndent) {
                return;	//exit now, we can' proceed further unless this is fixed
            }

            const arrayIndent = getIndentString(BASE_INDENTATION_STYLE, currentIndentLevel + 1);
            const arrayIndentDesc = getIndentDescription(BASE_INDENTATION_STYLE, currentIndentLevel + 1);

            elements.forEach(inspectElement.bind(null, arrayIndent, arrayIndentDesc));
        }