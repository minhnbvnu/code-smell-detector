function tryCast(value, test) {
            return value !== void 0 && test(value) ? value : void 0;
        }