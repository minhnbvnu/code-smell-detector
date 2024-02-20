function processImports() {
                scanner.setText(sourceText);
                nextToken();
                while (true) {
                    if (scanner.getToken() === 1 /* EndOfFileToken */) {
                        break;
                    }
                    if (scanner.getToken() === 15 /* TemplateHead */) {
                        const stack = [scanner.getToken()];
                        loop: while (length(stack)) {
                            const token = scanner.scan();
                            switch (token) {
                                case 1 /* EndOfFileToken */:
                                    break loop;
                                case 100 /* ImportKeyword */:
                                    tryConsumeImport();
                                    break;
                                case 15 /* TemplateHead */:
                                    stack.push(token);
                                    break;
                                case 18 /* OpenBraceToken */:
                                    if (length(stack)) {
                                        stack.push(token);
                                    }
                                    break;
                                case 19 /* CloseBraceToken */:
                                    if (length(stack)) {
                                        if (lastOrUndefined(stack) === 15 /* TemplateHead */) {
                                            if (scanner.reScanTemplateToken(
                                            /* isTaggedTemplate */
                                            false) === 17 /* TemplateTail */) {
                                                stack.pop();
                                            }
                                        }
                                        else {
                                            stack.pop();
                                        }
                                    }
                                    break;
                            }
                        }
                        nextToken();
                    }
                    if (tryConsumeDeclare() || tryConsumeImport() || tryConsumeExport() || detectJavaScriptImports && (tryConsumeRequireCall(
                    /*skipCurrentToken*/
                    false, 
                    /*allowTemplateLiterals*/
                    true) || tryConsumeDefine())) {
                        continue;
                    }
                    else {
                        nextToken();
                    }
                }
                scanner.setText(void 0);
            }