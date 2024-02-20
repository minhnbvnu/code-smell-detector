function emitUsingBuildInfo(config, host, getCommandLine, customTransformers) {
            var _a2, _b;
            (_a2 = tracing) == null ? void 0 : _a2.push(tracing.Phase.Emit, "emitUsingBuildInfo", {}, 
            /*separateBeginAndEnd*/
            true);
            ts_performance_exports.mark("beforeEmit");
            const result = emitUsingBuildInfoWorker(config, host, getCommandLine, customTransformers);
            ts_performance_exports.mark("afterEmit");
            ts_performance_exports.measure("Emit", "beforeEmit", "afterEmit");
            (_b = tracing) == null ? void 0 : _b.pop();
            return result;
        }