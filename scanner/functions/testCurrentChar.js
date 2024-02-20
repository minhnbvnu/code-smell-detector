function testCurrentChar() {
                        var char = parserInput.currentChar();
                        if (typeof tok === 'string') {
                            return char === tok;
                        }
                        else {
                            return tok.test(char);
                        }
                    }