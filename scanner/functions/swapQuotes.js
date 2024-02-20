function swapQuotes(str) {
        if(str.indexOf("\"") != -1) {
            str = str.replace("\"", "'");
            str = str.replace("\"", "'");
        } else {
            str = str.replace("'", "\"");
            str = str.replace("'", "\"");
        }
        return str;
    }