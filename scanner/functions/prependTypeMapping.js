function prependTypeMapping(source, target, mapper) {
                return !mapper ? makeUnaryTypeMapper(source, target) : makeCompositeTypeMapper(5 /* Merged */, makeUnaryTypeMapper(source, target), mapper);
            }