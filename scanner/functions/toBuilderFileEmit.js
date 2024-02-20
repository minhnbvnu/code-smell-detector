function toBuilderFileEmit(value, fullEmitForOptions) {
            return isNumber(value) ? fullEmitForOptions : value[1] || 8 /* Dts */;
        }