function originIsComputedPropertyName(origin) {
            return !!(origin && origin.kind & 512 /* ComputedPropertyName */);
        }