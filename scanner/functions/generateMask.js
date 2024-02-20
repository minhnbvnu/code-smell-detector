function generateMask(maskPrefix, maskPart) {
                    var maskParts = splitFirstOptionalEndPart(maskPart);
                    var newMask, maskTemplate;

                    var masks = splitFirstOptionalStartPart(maskParts[0]);
                    if (masks.length > 1) {
                        newMask = maskPrefix + masks[0] + markOptional(masks[1]) + (maskParts.length > 1 ? maskParts[1] : "");
                        maskTemplate = getMaskTemplate(newMask);
                        ms.push({
                            "mask": newMask,
                            "_buffer": maskTemplate["mask"],
                            "tests": getTestingChain(newMask),
                            "lastValidPosition": undefined,
                            "greedy": maskTemplate["greedy"],
                            "repeat": maskTemplate["repeat"]
                        });
                        newMask = maskPrefix + masks[0] + (maskParts.length > 1 ? maskParts[1] : "");
                        maskTemplate = getMaskTemplate(newMask);
                        ms.push({
                            "mask": newMask,
                            "_buffer": maskTemplate["mask"],
                            "tests": getTestingChain(newMask),
                            "lastValidPosition": undefined,
                            "greedy": maskTemplate["greedy"],
                            "repeat": maskTemplate["repeat"]
                        });
                        if (maskParts.length > 1 && maskParts[1].split(opts.optionalmarker.start).length > 1) {
                            generateMask(maskPrefix + masks[0] + markOptional(masks[1]), maskParts[1]);
                            generateMask(maskPrefix + masks[0], maskParts[1]);
                        }
                    }
                    else {
                        newMask = maskPrefix + maskParts;
                        maskTemplate = getMaskTemplate(newMask);
                        ms.push({
                            "mask" : newMask,
                            "_buffer": maskTemplate["mask"],
                            "tests": getTestingChain(newMask),
                            "lastValidPosition": undefined,
                            "greedy": maskTemplate["greedy"],
                            "repeat": maskTemplate["repeat"]
                        });
                    }

                }