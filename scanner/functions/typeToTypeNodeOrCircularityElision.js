function typeToTypeNodeOrCircularityElision(type2) {
                        var _a3, _b2, _c;
                        if (type2.flags & 1048576 /* Union */) {
                            if ((_a3 = context.visitedTypes) == null ? void 0 : _a3.has(getTypeId(type2))) {
                                if (!(context.flags & 131072 /* AllowAnonymousIdentifier */)) {
                                    context.encounteredError = true;
                                    (_c = (_b2 = context.tracker) == null ? void 0 : _b2.reportCyclicStructureError) == null ? void 0 : _c.call(_b2);
                                }
                                return createElidedInformationPlaceholder(context);
                            }
                            return visitAndTransformType(type2, (type3) => typeToTypeNodeHelper(type3, context));
                        }
                        return typeToTypeNodeHelper(type2, context);
                    }