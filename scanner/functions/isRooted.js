function isRooted(path) {
        return path.charAt(0) == "\\" || path.charAt(0) == "/" || (path.indexOf(":\\") != -1) || (path.indexOf(":/") != -1);
    }