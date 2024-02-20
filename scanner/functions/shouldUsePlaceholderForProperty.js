function shouldUsePlaceholderForProperty(propertySymbol, context) {
                    var _a2;
                    return !!(getCheckFlags(propertySymbol) & 8192 /* ReverseMapped */) && (contains(context.reverseMappedStack, propertySymbol) || ((_a2 = context.reverseMappedStack) == null ? void 0 : _a2[0]) && !(getObjectFlags(last(context.reverseMappedStack).links.propertyType) & 16 /* Anonymous */));
                }