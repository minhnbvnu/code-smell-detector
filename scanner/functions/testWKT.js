function testWKT(code) {
        return codeWords.some(function (word) {
            return code.indexOf(word) > -1;
        });
    }