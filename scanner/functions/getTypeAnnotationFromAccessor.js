function getTypeAnnotationFromAccessor(accessor) {
            if (accessor) {
                return accessor.kind === 174 /* GetAccessor */ ? accessor.type : accessor.parameters.length > 0 ? accessor.parameters[0].type : void 0;
            }
        }