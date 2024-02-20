function refreshFromBuffer(start, end, buffer) {
                var i, p;
                if (start === true) {
                    resetMaskSet();
                    start = 0;
                    end = buffer.length;
                } else {
                    for (i = start; i < end; i++) {
                        delete getMaskSet().validPositions[i];
                    }
                }
                p = start;
                for (i = start; i < end; i++) {
                    resetMaskSet(true);
                    if (buffer[i] !== opts.skipOptionalPartCharacter) {
                        var valResult = isValid(p, buffer[i], true, true);
                        if (valResult !== false) {
                            resetMaskSet(true);
                            p = valResult.caret !== undefined ? valResult.caret : valResult.pos + 1;
                        }
                    }
                }
            }