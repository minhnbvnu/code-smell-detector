function writeStackEvent(index, endTime, results) {
                        const { phase, name, args, time, separateBeginAndEnd } = eventStack[index];
                        if (separateBeginAndEnd) {
                            Debug.assert(!results, "`results` are not supported for events with `separateBeginAndEnd`");
                            writeEvent("E", phase, name, args, 
                            /*extras*/
                            void 0, endTime);
                        }
                        else if (sampleInterval - time % sampleInterval <= endTime - time) {
                            writeEvent("X", phase, name, { ...args, results }, `"dur":${endTime - time}`, time);
                        }
                    }