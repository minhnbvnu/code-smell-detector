function startTracing2(tracingMode, traceDir, configFilePath) {
                        Debug.assert(!tracing, "Tracing already started");
                        if (fs === void 0) {
                            try {
                                fs = require("fs");
                            }
                            catch (e) {
                                throw new Error(`tracing requires having fs
(original error: ${e.message || e})`);
                            }
                        }
                        mode = tracingMode;
                        typeCatalog.length = 0;
                        if (legendPath === void 0) {
                            legendPath = combinePaths(traceDir, "legend.json");
                        }
                        if (!fs.existsSync(traceDir)) {
                            fs.mkdirSync(traceDir, { recursive: true });
                        }
                        const countPart = mode === "build" ? `.${process.pid}-${++traceCount}` : mode === "server" ? `.${process.pid}` : ``;
                        const tracePath = combinePaths(traceDir, `trace${countPart}.json`);
                        const typesPath = combinePaths(traceDir, `types${countPart}.json`);
                        legend.push({
                            configFilePath,
                            tracePath,
                            typesPath
                        });
                        traceFd = fs.openSync(tracePath, "w");
                        tracing = tracingEnabled2;
                        const meta = { cat: "__metadata", ph: "M", ts: 1e3 * timestamp(), pid: 1, tid: 1 };
                        fs.writeSync(traceFd, "[\n" + [
                            { name: "process_name", args: { name: "tsc" }, ...meta },
                            { name: "thread_name", args: { name: "Main" }, ...meta },
                            { name: "TracingStartedInBrowser", ...meta, cat: "disabled-by-default-devtools.timeline" }
                        ].map((v) => JSON.stringify(v)).join(",\n"));
                    }