function maxOrMin(args, method) {
            var m, n,
                i = 0;

            if (isArray(args[0])) args = args[0];
            m = new BigNumber(args[0]);

            for (; ++i < args.length;) {
                n = new BigNumber(args[i]);

                // If any number is NaN, return NaN.
                if (!n.s) {
                    m = n;
                    break;
                } else if (method.call(m, n)) {
                    m = n;
                }
            }

            return m;
        }