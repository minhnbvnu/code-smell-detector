function getDecoded() {
                if (!generator.toDecodedMap)
                    return null;
                return clean(generator.toDecodedMap());
            }