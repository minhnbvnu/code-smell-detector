function getTransformFlagsOfTemplateLiteralLike(templateFlags) {
                let transformFlags = 1024 /* ContainsES2015 */;
                if (templateFlags) {
                    transformFlags |= 128 /* ContainsES2018 */;
                }
                return transformFlags;
            }