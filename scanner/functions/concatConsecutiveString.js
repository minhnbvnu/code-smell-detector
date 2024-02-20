function concatConsecutiveString(index, nodes) {
            const indexes = [];
            let text = "", rawText = "";
            while (index < nodes.length) {
                const node = nodes[index];
                if (isStringLiteralLike(node)) {
                    text += node.text;
                    rawText += escapeRawStringForTemplate(getTextOfNode(node).slice(1, -1));
                    indexes.push(index);
                    index++;
                }
                else if (isTemplateExpression(node)) {
                    text += node.head.text;
                    rawText += getRawTextOfTemplate(node.head);
                    break;
                }
                else {
                    break;
                }
            }
            return [index, text, rawText, indexes];
        }