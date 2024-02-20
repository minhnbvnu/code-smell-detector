function dumpLegend() {
                        if (!legendPath) {
                            return;
                        }
                        fs.writeFileSync(legendPath, JSON.stringify(legend));
                    }