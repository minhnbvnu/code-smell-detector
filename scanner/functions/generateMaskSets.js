function generateMaskSets() {
                var ms = [];
                function markOptional(maskPart) { //needed for the clearOptionalTail functionality
                    return opts.optionalmarker.start + maskPart + opts.optionalmarker.end;
                }
                function splitFirstOptionalEndPart(maskPart) {
                    var optionalStartMarkers = 0, optionalEndMarkers = 0, mpl = maskPart.length;
                    for (i = 0; i < mpl; i++) {
                        if (maskPart.charAt(i) == opts.optionalmarker.start) {
                            optionalStartMarkers++;
                        }
                        if (maskPart.charAt(i) == opts.optionalmarker.end) {
                            optionalEndMarkers++;
                        }
                        if (optionalStartMarkers > 0 && optionalStartMarkers == optionalEndMarkers)
                            break;
                    }
                    var maskParts = [maskPart.substring(0, i)];
                    if (i < mpl) {
                        maskParts.push(maskPart.substring(i + 1, mpl));
                    }
                    return maskParts;
                }
                function splitFirstOptionalStartPart(maskPart) {
                    var mpl = maskPart.length;
                    for (i = 0; i < mpl; i++) {
                        if (maskPart.charAt(i) == opts.optionalmarker.start) {
                           break;
                        }
                    }
                    var maskParts = [maskPart.substring(0, i)];
                    if (i < mpl) {
                        maskParts.push(maskPart.substring(i + 1, mpl));
                    }
                    return maskParts;
                }
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
                if ($.isArray(opts.mask)) {
                    $.each(opts.mask, function (ndx, lmnt) {
                        generateMask("", lmnt.toString());
                    });
                } else generateMask("", opts.mask.toString());

                return ms;
            }