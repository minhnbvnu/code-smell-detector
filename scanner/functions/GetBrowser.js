function GetBrowser(browser) {
    if (browser) {
        if (browser.indexOf("Chrome") >= 0) {
            return '<i class="icon-chrome"></i>' + browser;
        } else if (browser.indexOf("Firefox") >= 0) {
            return '<i class="icon-firefox"></i>' + browser;
        } else if (browser.indexOf("IE") >= 0) {
            return '<i class="icon-IE"></i>' + browser;
        } else if (browser.indexOf("Edge") >= 0) {
            return '<i class="icon-edge"></i>' + browser;
        } else if (browser.indexOf("Opera") >= 0) {
            return '<i class="icon-opera"></i>' + browser;
        } else if (browser.indexOf("Safari") >= 0) {
            return '<i class="icon-safari"></i>' + browser;
        } else {
            return '<i class="icon-browser2"></i>' + browser;
        }
    } else {
        return '<i class="icon-browser2"></i>未知浏览器';
    }
}