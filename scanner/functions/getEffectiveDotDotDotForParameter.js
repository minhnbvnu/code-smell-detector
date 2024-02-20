function getEffectiveDotDotDotForParameter(p) {
                            return p.dotDotDotToken || (p.type && isJSDocVariadicType(p.type) ? factory.createToken(25 /* DotDotDotToken */) : void 0);
                        }