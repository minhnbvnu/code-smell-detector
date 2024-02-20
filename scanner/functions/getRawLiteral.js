function getRawLiteral(node, currentSourceFile) {
            let text = node.rawText;
            if (text === void 0) {
                Debug.assertIsDefined(currentSourceFile, "Template literal node is missing 'rawText' and does not have a source file. Possibly bad transform.");
                text = getSourceTextOfNodeFromSourceFile(currentSourceFile, node);
                const isLast = node.kind === 14 /* NoSubstitutionTemplateLiteral */ || node.kind === 17 /* TemplateTail */;
                text = text.substring(1, text.length - (isLast ? 1 : 2));
            }
            text = text.replace(/\r\n?/g, "\n");
            return setTextRange(factory.createStringLiteral(text), node);
        }