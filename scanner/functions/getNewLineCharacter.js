function getNewLineCharacter(options) {
            switch (options.newLine) {
                case 0 /* CarriageReturnLineFeed */:
                    return carriageReturnLineFeed;
                case 1 /* LineFeed */:
                case void 0:
                    return lineFeed;
            }
        }