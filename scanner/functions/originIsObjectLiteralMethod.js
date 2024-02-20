function originIsObjectLiteralMethod(origin) {
            return !!(origin && origin.kind & 128 /* ObjectLiteralMethod */);
        }