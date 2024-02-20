function nodesToTemplate({ nodes, operators }, file) {
            const copyOperatorComments = copyTrailingOperatorComments(operators, file);
            const copyCommentFromStringLiterals = copyCommentFromMultiNode(nodes, file, copyOperatorComments);
            const [begin, headText, rawHeadText, headIndexes] = concatConsecutiveString(0, nodes);
            if (begin === nodes.length) {
                const noSubstitutionTemplateLiteral = factory.createNoSubstitutionTemplateLiteral(headText, rawHeadText);
                copyCommentFromStringLiterals(headIndexes, noSubstitutionTemplateLiteral);
                return noSubstitutionTemplateLiteral;
            }
            const templateSpans = [];
            const templateHead = factory.createTemplateHead(headText, rawHeadText);
            copyCommentFromStringLiterals(headIndexes, templateHead);
            for (let i = begin; i < nodes.length; i++) {
                const currentNode = getExpressionFromParenthesesOrExpression(nodes[i]);
                copyOperatorComments(i, currentNode);
                const [newIndex, subsequentText, rawSubsequentText, stringIndexes] = concatConsecutiveString(i + 1, nodes);
                i = newIndex - 1;
                const isLast = i === nodes.length - 1;
                if (isTemplateExpression(currentNode)) {
                    const spans = map(currentNode.templateSpans, (span, index) => {
                        copyExpressionComments(span);
                        const isLastSpan = index === currentNode.templateSpans.length - 1;
                        const text = span.literal.text + (isLastSpan ? subsequentText : "");
                        const rawText = getRawTextOfTemplate(span.literal) + (isLastSpan ? rawSubsequentText : "");
                        return factory.createTemplateSpan(span.expression, isLast && isLastSpan ? factory.createTemplateTail(text, rawText) : factory.createTemplateMiddle(text, rawText));
                    });
                    templateSpans.push(...spans);
                }
                else {
                    const templatePart = isLast ? factory.createTemplateTail(subsequentText, rawSubsequentText) : factory.createTemplateMiddle(subsequentText, rawSubsequentText);
                    copyCommentFromStringLiterals(stringIndexes, templatePart);
                    templateSpans.push(factory.createTemplateSpan(currentNode, templatePart));
                }
            }
            return factory.createTemplateExpression(templateHead, templateSpans);
        }