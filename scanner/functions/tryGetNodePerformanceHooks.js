function tryGetNodePerformanceHooks() {
            if (isNodeLikeSystem()) {
                try {
                    let performance2;
                    const { performance: nodePerformance, PerformanceObserver: PerformanceObserver2 } = require("perf_hooks");
                    if (hasRequiredAPI(nodePerformance, PerformanceObserver2)) {
                        performance2 = nodePerformance;
                        const version2 = new Version(process.versions.node);
                        const range = new VersionRange("<12.16.3 || 13 <13.13");
                        if (range.test(version2)) {
                            performance2 = {
                                get timeOrigin() {
                                    return nodePerformance.timeOrigin;
                                },
                                now() {
                                    return nodePerformance.now();
                                },
                                mark(name) {
                                    return nodePerformance.mark(name);
                                },
                                measure(name, start = "nodeStart", end) {
                                    if (end === void 0) {
                                        end = "__performance.measure-fix__";
                                        nodePerformance.mark(end);
                                    }
                                    nodePerformance.measure(name, start, end);
                                    if (end === "__performance.measure-fix__") {
                                        nodePerformance.clearMarks("__performance.measure-fix__");
                                    }
                                },
                                clearMarks(name) {
                                    return nodePerformance.clearMarks(name);
                                },
                                clearMeasures(name) {
                                    return nodePerformance.clearMeasures(name);
                                }
                            };
                        }
                        return {
                            // By default, only write native events when generating a cpu profile or using the v8 profiler.
                            shouldWriteNativeEvents: false,
                            performance: performance2,
                            PerformanceObserver: PerformanceObserver2
                        };
                    }
                }
                catch (e) {
                }
            }
        }