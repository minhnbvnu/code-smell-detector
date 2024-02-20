function appendTypeMapping(mapper, source, target) {
                return !mapper ? makeUnaryTypeMapper(source, target) : makeCompositeTypeMapper(5 /* Merged */, mapper, makeUnaryTypeMapper(source, target));
            }