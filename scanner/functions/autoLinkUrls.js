function autoLinkUrls(txt) {
        return txt.replace(/(^|\s)(https?|ftp)(:[^'"<>\s]+)/gi,
            "$1<a target=\"_blank\" href=\"$2$3\">$2$3</a>");
    }