function tryCamelCaseMatch(candidate, candidateParts, chunk, ignoreCase) {
            const chunkCharacterSpans = chunk.characterSpans;
            let currentCandidate = 0;
            let currentChunkSpan = 0;
            let firstMatch;
            let contiguous;
            while (true) {
                if (currentChunkSpan === chunkCharacterSpans.length) {
                    return true;
                }
                else if (currentCandidate === candidateParts.length) {
                    return false;
                }
                let candidatePart = candidateParts[currentCandidate];
                let gotOneMatchThisCandidate = false;
                for (; currentChunkSpan < chunkCharacterSpans.length; currentChunkSpan++) {
                    const chunkCharacterSpan = chunkCharacterSpans[currentChunkSpan];
                    if (gotOneMatchThisCandidate) {
                        if (!isUpperCaseLetter(chunk.text.charCodeAt(chunkCharacterSpans[currentChunkSpan - 1].start)) || !isUpperCaseLetter(chunk.text.charCodeAt(chunkCharacterSpans[currentChunkSpan].start))) {
                            break;
                        }
                    }
                    if (!partStartsWith(candidate, candidatePart, chunk.text, ignoreCase, chunkCharacterSpan)) {
                        break;
                    }
                    gotOneMatchThisCandidate = true;
                    firstMatch = firstMatch === void 0 ? currentCandidate : firstMatch;
                    contiguous = contiguous === void 0 ? true : contiguous;
                    candidatePart = createTextSpan(candidatePart.start + chunkCharacterSpan.length, candidatePart.length - chunkCharacterSpan.length);
                }
                if (!gotOneMatchThisCandidate && contiguous !== void 0) {
                    contiguous = false;
                }
                currentCandidate++;
            }
        }