function handleBinaryFile(binFile) {
            var data = findEXIFinJPEG(binFile);
            img.exifdata = data || {};
            var iptcdata = findIPTCinJPEG(binFile);
            img.iptcdata = iptcdata || {};
            if (EXIF.isXmpEnabled) {
                var xmpdata = findXMPinJPEG(binFile);
                img.xmpdata = xmpdata || {};
            }
            if (callback) {
                callback.call(img);
            }
        }