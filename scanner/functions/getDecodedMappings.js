function getDecodedMappings() {
                if (decodedMappings === void 0) {
                    const decoder = decodeMappings(map2.mappings);
                    const mappings = arrayFrom(decoder, processMapping);
                    if (decoder.error !== void 0) {
                        if (host.log) {
                            host.log(`Encountered error while decoding sourcemap: ${decoder.error}`);
                        }
                        decodedMappings = emptyArray;
                    }
                    else {
                        decodedMappings = mappings;
                    }
                }
                return decodedMappings;
            }