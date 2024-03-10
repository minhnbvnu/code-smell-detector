function getLiteralText(node, sourceFile, flags) {
            var _a2;
            if (sourceFile && canUseOriginalText(node, flags)) {
                return getSourceTextOfNodeFromSourceFile(sourceFile, node);
            }
            switch (node.kind) {
                case 10 /* StringLiteral */: {
                    const escapeText = flags & 2 /* JsxAttributeEscape */ ? escapeJsxAttributeString : flags & 1 /* NeverAsciiEscape */ || getEmitFlags(node) & 33554432 /* NoAsciiEscaping */ ? escapeString : escapeNonAsciiString;
                    if (node.singleQuote) {
                        return "'" + escapeText(node.text, 39 /* singleQuote */) + "'";
                    }
                    else {
                        return '"' + escapeText(node.text, 34 /* doubleQuote */) + '"';
                    }
                }
                case 14 /* NoSubstitutionTemplateLiteral */:
                case 15 /* TemplateHead */:
                case 16 /* TemplateMiddle */:
                case 17 /* TemplateTail */: {
                    const escapeText = flags & 1 /* NeverAsciiEscape */ || getEmitFlags(node) & 33554432 /* NoAsciiEscaping */ ? escapeString : escapeNonAsciiString;
                    const rawText = (_a2 = node.rawText) != null ? _a2 : escapeTemplateSubstitution(escapeText(node.text, 96 /* backtick */));
                    switch (node.kind) {
                        case 14 /* NoSubstitutionTemplateLiteral */:
                            return "`" + rawText + "`";
                        case 15 /* TemplateHead */:
                            return "`" + rawText + "${";
                        case 16 /* TemplateMiddle */:
                            return "}" + rawText + "${";
                        case 17 /* TemplateTail */:
                            return "}" + rawText + "`";
                    }
                    break;
                }
                case 8 /* NumericLiteral */:
                case 9 /* BigIntLiteral */:
                    return node.text;
                case 13 /* RegularExpressionLiteral */:
                    if (flags & 4 /* TerminateUnterminatedLiterals */ && node.isUnterminated) {
                        return node.text + (node.text.charCodeAt(node.text.length - 1) === 92 /* backslash */ ? " /" : "/");
                    }
                    return node.text;
            }
            return Debug.fail(`Literal kind '${node.kind}' not accounted for.`);
        }