function itemSelectedCallback(carousel, item, index) {
        item = $(item);
        var src = item.find("img").attr("src");
        var alt = item.find("img").attr("alt");
        if (src) {
            $("#viewerImg").attr("src", src);
        }
        if (alt) {
            $("#viewerImg").attr("alt", alt);
        }
    }