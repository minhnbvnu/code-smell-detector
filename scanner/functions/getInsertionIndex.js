function getInsertionIndex(indexBitmap, maskPosition) {
            let index = 0;
            for (let pos = 0; pos <= maskPosition; pos += maskBitSize) {
                index += indexBitmap & mask;
                indexBitmap >>= maskBitSize;
            }
            return index;
        }