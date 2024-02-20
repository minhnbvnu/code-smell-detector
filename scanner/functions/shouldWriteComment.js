function shouldWriteComment(text, pos) {
                if (printerOptions.onlyPrintJsDocStyle) {
                    return isJSDocLikeText(text, pos) || isPinnedComment(text, pos);
                }
                return true;
            }