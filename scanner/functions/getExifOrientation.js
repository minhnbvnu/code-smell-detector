function getExifOrientation (img) {
        return img.exifdata && img.exifdata.Orientation ? num(img.exifdata.Orientation) : 1;
    }