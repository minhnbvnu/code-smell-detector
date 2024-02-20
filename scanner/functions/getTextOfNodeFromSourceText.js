function getTextOfNodeFromSourceText(sourceText, node, includeTrivia = false) {
            if (nodeIsMissing(node)) {
                return "";
            }
            let text = sourceText.substring(includeTrivia ? node.pos : skipTrivia(sourceText, node.pos), node.end);
            if (isJSDocTypeExpressionOrChild(node)) {
                text = text.split(/\r\n|\n|\r/).map((line) => trimStringStart(line.replace(/^\s*\*/, ""))).join("\n");
            }
            return text;
        }