function normalizeOffset(offset, byteLength) {
                return 0 > offset ? offset + byteLength : offset;
            }