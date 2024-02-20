function stopTracing() {
                        Debug.assert(tracing, "Tracing is not in progress");
                        Debug.assert(!!typeCatalog.length === (mode !== "server"));
                        fs.writeSync(traceFd, `
]
`);
                        fs.closeSync(traceFd);
                        tracing = void 0;
                        if (typeCatalog.length) {
                            dumpTypes(typeCatalog);
                        }
                        else {
                            legend[legend.length - 1].typesPath = void 0;
                        }
                    }