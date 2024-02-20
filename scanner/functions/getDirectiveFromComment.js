function getDirectiveFromComment(text2, commentDirectiveRegEx) {
                const match = commentDirectiveRegEx.exec(text2);
                if (!match) {
                    return void 0;
                }
                switch (match[1]) {
                    case "ts-expect-error":
                        return 0 /* ExpectError */;
                    case "ts-ignore":
                        return 1 /* Ignore */;
                }
                return void 0;
            }