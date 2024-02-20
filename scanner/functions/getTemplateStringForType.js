function getTemplateStringForType(type) {
                return type.flags & 128 /* StringLiteral */ ? type.value : type.flags & 256 /* NumberLiteral */ ? "" + type.value : type.flags & 2048 /* BigIntLiteral */ ? pseudoBigIntToString(type.value) : type.flags & (512 /* BooleanLiteral */ | 98304 /* Nullable */) ? type.intrinsicName : void 0;
            }