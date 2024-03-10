function eatArray(i, key, args, argAfterEqualSign) {
                let argsToSet = [];
                let next = argAfterEqualSign || args[i + 1];
                const nargsCount = checkAllAliases(key, flags.nargs);
                if (checkAllAliases(key, flags.bools) && !(/^(true|false)$/.test(next))) {
                    argsToSet.push(true);
                }
                else if (isUndefined(next) ||
                    (isUndefined(argAfterEqualSign) && /^-/.test(next) && !negative.test(next) && !isUnknownOptionAsArg(next))) {
                    if (defaults[key] !== undefined) {
                        const defVal = defaults[key];
                        argsToSet = Array.isArray(defVal) ? defVal : [defVal];
                    }
                }
                else {
                    if (!isUndefined(argAfterEqualSign)) {
                        argsToSet.push(processValue(key, argAfterEqualSign, true));
                    }
                    for (let ii = i + 1; ii < args.length; ii++) {
                        if ((!configuration['greedy-arrays'] && argsToSet.length > 0) ||
                            (nargsCount && typeof nargsCount === 'number' && argsToSet.length >= nargsCount))
                            break;
                        next = args[ii];
                        if (/^-/.test(next) && !negative.test(next) && !isUnknownOptionAsArg(next))
                            break;
                        i = ii;
                        argsToSet.push(processValue(key, next, inputIsString));
                    }
                }
                if (typeof nargsCount === 'number' && ((nargsCount && argsToSet.length < nargsCount) ||
                    (isNaN(nargsCount) && argsToSet.length === 0))) {
                    error = Error(__('Not enough arguments following: %s', key));
                }
                setArg(key, argsToSet);
                return i;
            }