function buildPostMask(buffer, opts) {
                    var postMask = "";
                    postMask += "(" + opts.groupSeparator + "*{" + opts.groupSize + "}){*}";
                    if (opts.radixPoint !== "") {
                        var radixSplit = buffer.join("").split(opts.radixPoint);
                        if (radixSplit[1]) {
                            postMask += opts.radixPoint + "*{" + radixSplit[1].match(/^\d*\??\d*/)[0].length + "}";
                        }
                    }
                    return postMask;
                }