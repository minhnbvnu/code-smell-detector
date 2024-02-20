function isLocalName(node) {
            return (getEmitFlags(node) & 32768 /* LocalName */) !== 0;
        }