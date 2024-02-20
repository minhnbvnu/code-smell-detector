function appendMappingCharCode(charCode) {
                mappingCharCodes.push(charCode);
                if (mappingCharCodes.length >= 1024) {
                    flushMappingBuffer();
                }
            }