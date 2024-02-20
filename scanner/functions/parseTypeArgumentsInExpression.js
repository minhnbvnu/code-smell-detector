function parseTypeArgumentsInExpression() {
                        if ((contextFlags & 262144 /* JavaScriptFile */) !== 0) {
                            return void 0;
                        }
                        if (reScanLessThanToken() !== 29 /* LessThanToken */) {
                            return void 0;
                        }
                        nextToken();
                        const typeArguments = parseDelimitedList(20 /* TypeArguments */, parseType);
                        if (reScanGreaterToken() !== 31 /* GreaterThanToken */) {
                            return void 0;
                        }
                        nextToken();
                        return typeArguments && canFollowTypeArgumentsInExpression() ? typeArguments : void 0;
                    }