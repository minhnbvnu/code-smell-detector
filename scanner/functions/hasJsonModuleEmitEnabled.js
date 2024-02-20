function hasJsonModuleEmitEnabled(options) {
            switch (getEmitModuleKind(options)) {
                case 1 /* CommonJS */:
                case 2 /* AMD */:
                case 5 /* ES2015 */:
                case 6 /* ES2020 */:
                case 7 /* ES2022 */:
                case 99 /* ESNext */:
                case 100 /* Node16 */:
                case 199 /* NodeNext */:
                    return true;
                default:
                    return false;
            }
        }