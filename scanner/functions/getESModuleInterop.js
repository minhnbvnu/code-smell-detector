function getESModuleInterop(compilerOptions) {
            if (compilerOptions.esModuleInterop !== void 0) {
                return compilerOptions.esModuleInterop;
            }
            switch (getEmitModuleKind(compilerOptions)) {
                case 100 /* Node16 */:
                case 199 /* NodeNext */:
                    return true;
            }
            return void 0;
        }