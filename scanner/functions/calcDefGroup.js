function calcDefGroup(mixin, mixinPath) {
                var f, p, namespace;
                for (f = 0; f < 2; f++) {
                    conditionResult[f] = true;
                    default_1.default.value(f);
                    for (p = 0; p < mixinPath.length && conditionResult[f]; p++) {
                        namespace = mixinPath[p];
                        if (namespace.matchCondition) {
                            conditionResult[f] = conditionResult[f] && namespace.matchCondition(null, context);
                        }
                    }
                    if (mixin.matchCondition) {
                        conditionResult[f] = conditionResult[f] && mixin.matchCondition(args, context);
                    }
                }
                if (conditionResult[0] || conditionResult[1]) {
                    if (conditionResult[0] != conditionResult[1]) {
                        return conditionResult[1] ?
                            defTrue : defFalse;
                    }
                    return defNone;
                }
                return defFalseEitherCase;
            }