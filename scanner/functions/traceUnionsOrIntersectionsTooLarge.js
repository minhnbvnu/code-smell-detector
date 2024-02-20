function traceUnionsOrIntersectionsTooLarge(source2, target2) {
                    if (!tracing) {
                        return;
                    }
                    if (source2.flags & 3145728 /* UnionOrIntersection */ && target2.flags & 3145728 /* UnionOrIntersection */) {
                        const sourceUnionOrIntersection = source2;
                        const targetUnionOrIntersection = target2;
                        if (sourceUnionOrIntersection.objectFlags & targetUnionOrIntersection.objectFlags & 32768 /* PrimitiveUnion */) {
                            return;
                        }
                        const sourceSize = sourceUnionOrIntersection.types.length;
                        const targetSize = targetUnionOrIntersection.types.length;
                        if (sourceSize * targetSize > 1e6) {
                            tracing.instant(tracing.Phase.CheckTypes, "traceUnionsOrIntersectionsTooLarge_DepthLimit", {
                                sourceId: source2.id,
                                sourceSize,
                                targetId: target2.id,
                                targetSize,
                                pos: errorNode == null ? void 0 : errorNode.pos,
                                end: errorNode == null ? void 0 : errorNode.end
                            });
                        }
                    }
                }