function getLocalName(node, allowComments, allowSourceMaps) {
                return getName(node, allowComments, allowSourceMaps, 32768 /* LocalName */);
            }