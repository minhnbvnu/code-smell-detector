function getInternalName(node, allowComments, allowSourceMaps) {
                return getName(node, allowComments, allowSourceMaps, 32768 /* LocalName */ | 65536 /* InternalName */);
            }