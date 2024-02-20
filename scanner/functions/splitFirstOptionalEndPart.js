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