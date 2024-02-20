function getEmitModuleDetectionKind(options) {
            return options.moduleDetection || (getEmitModuleKind(options) === 100 /* Node16 */ || getEmitModuleKind(options) === 199 /* NodeNext */ ? 3 /* Force */ : 2 /* Auto */);
        }