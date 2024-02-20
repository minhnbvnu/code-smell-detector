function free(buf) {
                bufferPool[log2(buf.byteLength) >> 2].push(buf);
            }