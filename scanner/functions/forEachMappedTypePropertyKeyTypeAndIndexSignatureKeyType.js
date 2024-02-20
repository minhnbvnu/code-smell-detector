function forEachMappedTypePropertyKeyTypeAndIndexSignatureKeyType(type, include, stringsOnly, cb) {
                for (const prop of getPropertiesOfType(type)) {
                    cb(getLiteralTypeFromProperty(prop, include));
                }
                if (type.flags & 1 /* Any */) {
                    cb(stringType);
                }
                else {
                    for (const info of getIndexInfosOfType(type)) {
                        if (!stringsOnly || info.keyType.flags & (4 /* String */ | 134217728 /* TemplateLiteral */)) {
                            cb(info.keyType);
                        }
                    }
                }
            }