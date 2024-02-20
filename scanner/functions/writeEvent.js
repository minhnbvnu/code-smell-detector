function writeEvent(eventType, phase, name, args, extras, time = 1e3 * timestamp()) {
                        if (mode === "server" && phase === "checkTypes" /* CheckTypes */)
                            return;
                        mark("beginTracing");
                        fs.writeSync(traceFd, `,
{"pid":1,"tid":1,"ph":"${eventType}","cat":"${phase}","ts":${time},"name":"${name}"`);
                        if (extras)
                            fs.writeSync(traceFd, `,${extras}`);
                        if (args)
                            fs.writeSync(traceFd, `,"args":${JSON.stringify(args)}`);
                        fs.writeSync(traceFd, `}`);
                        mark("endTracing");
                        measure("Tracing", "beginTracing", "endTracing");
                    }