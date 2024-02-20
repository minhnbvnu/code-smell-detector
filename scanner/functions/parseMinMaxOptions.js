function parseMinMaxOptions(opts) {
                    if (opts.parseMinMaxOptions === undefined) {
                        if (opts.min !== null) {
                            opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
                            if (opts.radixPoint === ",") opts.min = opts.min.replace(opts.radixPoint, ".");
                            opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN;
                            if (isNaN(opts.min)) opts.min = Number.MIN_VALUE;
                        }
                        if (opts.max !== null) {
                            opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
                            if (opts.radixPoint === ",") opts.max = opts.max.replace(opts.radixPoint, ".");
                            opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN;
                            if (isNaN(opts.max)) opts.max = Number.MAX_VALUE;
                        }
                        opts.parseMinMaxOptions = "done";
                    }
                }