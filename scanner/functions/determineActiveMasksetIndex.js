function determineActiveMasksetIndex(buffer, pos, currentActiveMasksetIndex, isRTL) {
                $.each(masksets, function (index, value) {
                    var activeMaskset = this;
                    if (activeMaskset['lastValidPosition'] && (isRTL || opts.numericInput) ? activeMaskset['lastValidPosition'] <= pos : activeMaskset['lastValidPosition'] >= pos) {
                        activeMasksetIndex = index;
                        //reset to correct masktemplate
                        if (activeMasksetIndex != currentActiveMasksetIndex) {
                            var abl = getMaskLength(buffer), bufTemplate = getActiveBuffer();
                            if (isRTL || opts.numericInput) {
                                buffer.reverse();
                                bufTemplate.reverse();
                            }
                            buffer.length = pos; //clearout beyond the current
                            for (var i = pos; i < abl; i++) {
                                var testPos = determineTestPosition(i);
                                setBufferElement(buffer, i, getBufferElement(bufTemplate, testPos));
                            }
                            if (isRTL) {
                                buffer.reverse();
                            }
                        }
                        return false; //breaks
                    }
                });
            }