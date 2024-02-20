function getCookedText(kind, rawText) {
            if (!rawTextScanner) {
                rawTextScanner = createScanner(99 /* Latest */, 
                /*skipTrivia*/
                false, 0 /* Standard */);
            }
            switch (kind) {
                case 14 /* NoSubstitutionTemplateLiteral */:
                    rawTextScanner.setText("`" + rawText + "`");
                    break;
                case 15 /* TemplateHead */:
                    rawTextScanner.setText("`" + rawText + "${");
                    break;
                case 16 /* TemplateMiddle */:
                    rawTextScanner.setText("}" + rawText + "${");
                    break;
                case 17 /* TemplateTail */:
                    rawTextScanner.setText("}" + rawText + "`");
                    break;
            }
            let token = rawTextScanner.scan();
            if (token === 19 /* CloseBraceToken */) {
                token = rawTextScanner.reScanTemplateToken(
                /*isTaggedTemplate*/
                false);
            }
            if (rawTextScanner.isUnterminated()) {
                rawTextScanner.setText(void 0);
                return invalidValueSentinel;
            }
            let tokenValue;
            switch (token) {
                case 14 /* NoSubstitutionTemplateLiteral */:
                case 15 /* TemplateHead */:
                case 16 /* TemplateMiddle */:
                case 17 /* TemplateTail */:
                    tokenValue = rawTextScanner.getTokenValue();
                    break;
            }
            if (tokenValue === void 0 || rawTextScanner.scan() !== 1 /* EndOfFileToken */) {
                rawTextScanner.setText(void 0);
                return invalidValueSentinel;
            }
            rawTextScanner.setText(void 0);
            return tokenValue;
        }