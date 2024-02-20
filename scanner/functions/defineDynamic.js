function defineDynamic(type, data) {
            return new DynamicVariable(type, toAccessorString(data + ''));
        }