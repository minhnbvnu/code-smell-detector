function getLiteralPropertyNameText(name) {
                const type = getLiteralTypeFromPropertyName(name);
                return type.flags & (128 /* StringLiteral */ | 256 /* NumberLiteral */) ? "" + type.value : void 0;
            }