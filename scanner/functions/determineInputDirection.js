function determineInputDirection(input, pos) {
                    //set input direction according the position to the radixPoint
                    if (opts.numericInput && opts.radixPoint != "") {
                        var nptStr = input._valueGet();
                        var radixPosition = nptStr.indexOf(opts.radixPoint);
                        isRTL = pos.begin <= radixPosition || pos.end <= radixPosition || radixPosition == -1;
                    }
                }