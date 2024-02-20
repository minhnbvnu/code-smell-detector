function _isValid(position, activeMaskset) {
                    var testPos = determineTestPosition(position), loopend = c ? 1 : 0, chrs = '';
                    for (var i = activeMaskset['tests'][testPos].cardinality; i > loopend; i--) {
                        chrs += getBufferElement(buffer, testPos - (i - 1));
                    }

                    if (c) {
                        chrs += c;
                    }

                    //return is false or a json object => { pos: ??, c: ??} or true
                    return activeMaskset['tests'][testPos].fn != null ? activeMaskset['tests'][testPos].fn.test(chrs, buffer, position, strict, opts) : false;
                }