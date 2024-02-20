function flushMappingBuffer() {
                if (mappingCharCodes.length > 0) {
                    mappings += String.fromCharCode.apply(void 0, mappingCharCodes);
                    mappingCharCodes.length = 0;
                }
            }