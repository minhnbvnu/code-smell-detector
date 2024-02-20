function getPendingEmitKind(optionsOrEmitKind, oldOptionsOrEmitKind) {
            const oldEmitKind = oldOptionsOrEmitKind && (isNumber(oldOptionsOrEmitKind) ? oldOptionsOrEmitKind : getBuilderFileEmit(oldOptionsOrEmitKind));
            const emitKind = isNumber(optionsOrEmitKind) ? optionsOrEmitKind : getBuilderFileEmit(optionsOrEmitKind);
            if (oldEmitKind === emitKind)
                return 0 /* None */;
            if (!oldEmitKind || !emitKind)
                return emitKind;
            const diff = oldEmitKind ^ emitKind;
            let result = 0 /* None */;
            if (diff & 7 /* AllJs */)
                result = emitKind & 7 /* AllJs */;
            if (diff & 24 /* AllDts */)
                result = result | emitKind & 24 /* AllDts */;
            return result;
        }