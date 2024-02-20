function compileAccumulatorLoop(aggregator) {
            if (aggregator.accumulate) {
                var accumulatorInfo = getFunctionInfo(aggregator.accumulate);
                var fn = new Function("_items", "for (var " + accumulatorInfo.params[0] + ", _i=0, _il=_items.length; _i<_il; _i++) {" +
                    accumulatorInfo.params[0] + " = _items[_i]; " +
                    accumulatorInfo.body +
                    "}");
                var fnName = "compiledAccumulatorLoop";
                fn.displayName = fnName;
                fn.name = setFunctionName(fn, fnName);
                return fn;
            }
            else {
                return function noAccumulator() {
                };
            }
        }