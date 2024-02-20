function eatNargs(i, key, args, argAfterEqualSign) {
                let ii;
                let toEat = checkAllAliases(key, flags.nargs);
                toEat = typeof toEat !== 'number' || isNaN(toEat) ? 1 : toEat;
                if (toEat === 0) {
                    if (!isUndefined(argAfterEqualSign)) {
                        error = Error(__('Argument unexpected for: %s', key));
                    }
                    setArg(key, defaultValue(key));
                    return i;
                }
                let available = isUndefined(argAfterEqualSign) ? 0 : 1;
                if (configuration['nargs-eats-options']) {
                    if (args.length - (i + 1) + available < toEat) {
                        error = Error(__('Not enough arguments following: %s', key));
                    }
                    available = toEat;
                }
                else {
                    for (ii = i + 1; ii < args.length; ii++) {
                        if (!args[ii].match(/^-[^0-9]/) || args[ii].match(negative) || isUnknownOptionAsArg(args[ii]))
                            available++;
                        else
                            break;
                    }
                    if (available < toEat)
                        error = Error(__('Not enough arguments following: %s', key));
                }
                let consumed = Math.min(available, toEat);
                if (!isUndefined(argAfterEqualSign) && consumed > 0) {
                    setArg(key, argAfterEqualSign);
                    consumed--;
                }
                for (ii = i + 1; ii < (consumed + i + 1); ii++) {
                    setArg(key, args[ii]);
                }
                return (i + consumed);
            }