function getApplicableIndexInfos(type, keyType) {
                return getIndexInfosOfType(type).filter((info) => isApplicableIndexType(keyType, info.keyType));
            }