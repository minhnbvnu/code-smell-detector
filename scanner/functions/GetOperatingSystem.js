function GetOperatingSystem(os) {
    if (os) {
        if (os.indexOf("Windows") >= 0) {
            return '<i class="icon-windows8"></i>' + os;
        } else if (os.indexOf("Mac") >= 0) {
            return '<i class="icon-apple"></i>' + os;
        } else if (os.indexOf("Chrome") >= 0) {
            return '<i class="icon-chrome"></i>' + os;
        } else if (os.indexOf("Android") >= 0) {
            return '<i class="icon-android"></i>' + os;
        } else {
            return '<i class="icon-stats"></i>' + os;
        }
    } else {
        return '<i class="icon-stats"></i>未知操作系统';
    }
}