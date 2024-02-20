function createImageSrc(content) {
            var mimeType = Lib.extractMimeType(content.mimeType);
            // https://css-tricks.com/data-uris/
            return "data:" + mimeType + ";base64," + content.text;
        }