function hasNumericPropertyNames(type) {
                return getIndexInfosOfType(type).length === 1 && !!getIndexInfoOfType(type, numberType);
            }