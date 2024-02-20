function getTypeMetadata(node, container) {
                if (!legacyDecorators)
                    return void 0;
                return USE_NEW_TYPE_METADATA_FORMAT ? getNewTypeMetadata(node, container) : getOldTypeMetadata(node, container);
            }