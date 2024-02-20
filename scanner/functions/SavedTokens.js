function SavedTokens() {
            this.prevToken = null;
            this.curSavedToken = null;
            this.prevSavedToken = null;
            this.prevToken = null;
            this.currentToken = 0;
            this.tokens = new Array();
            this.seenUnicodeChar = false;
            this.seenUnicodeCharInComment = false;
            this.prevLine = 1;
            this.line = 1;
            this.col = 0;
            this.lexState = LexState.Start;
            this.commentStack = new Array();
            this.lineMap = [];
        }