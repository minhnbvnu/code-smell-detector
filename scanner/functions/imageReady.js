function imageReady(e) {
        img = there.img;
        sjs.spriteCache[src].loaded = true;
        there.imgLoaded = true;
        if (there.layer && !there.layer.useCanvas)
            there.dom.style.backgroundImage = 'url(' + src + ')';
        there.imgNaturalWidth = img.width;
        there.imgNaturalHeight = img.height;
        if (there.w === null || resetSize)
            there.setW(img.width);
        if (there.h === null || resetSize)
            there.setH(img.height);
        there.onload();
    }