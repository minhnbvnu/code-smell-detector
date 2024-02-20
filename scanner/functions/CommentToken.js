function CommentToken(tokenID, value, isBlock, startPos, line, endsLine) {
                _super.call(this, tokenID);
            this.value = value;
            this.isBlock = isBlock;
            this.startPos = startPos;
            this.line = line;
            this.endsLine = endsLine;
        }