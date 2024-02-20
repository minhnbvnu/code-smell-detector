function inRuleOrder(v, a) {
                var o = options.ort;
                return (o ? a : v) + ", " + (o ? v : a);
            }