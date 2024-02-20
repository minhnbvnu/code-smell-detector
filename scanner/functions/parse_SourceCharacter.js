function parse_SourceCharacter() {
                var result0;

                if (input.length > pos.offset) {
                    result0 = input.charAt(pos.offset);
                    advance(pos, 1);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("any character");
                    }
                }
                return result0;
            }