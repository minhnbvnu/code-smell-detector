function getNthPos(searchStr, char, pos) {
        var i,
            charCount = 0,
            strArr = searchStr.split(char);

        if (pos === 0) {
            return 0;
        }

        for (i = 0; i < pos; i++) {
            if (i >= strArr.length) {
                return -1;
            }

            // +1 because we split out some characters
            charCount += strArr[i].length + char.length;
        }

        return charCount;
    }