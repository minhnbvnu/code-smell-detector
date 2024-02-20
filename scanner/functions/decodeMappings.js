function decodeMappings(mappings) {
            let done = false;
            let pos = 0;
            let generatedLine = 0;
            let generatedCharacter = 0;
            let sourceIndex = 0;
            let sourceLine = 0;
            let sourceCharacter = 0;
            let nameIndex = 0;
            let error;
            return {
                get pos() {
                    return pos;
                },
                get error() {
                    return error;
                },
                get state() {
                    return captureMapping(
                    /*hasSource*/
                    true, 
                    /*hasName*/
                    true);
                },
                next() {
                    while (!done && pos < mappings.length) {
                        const ch = mappings.charCodeAt(pos);
                        if (ch === 59 /* semicolon */) {
                            generatedLine++;
                            generatedCharacter = 0;
                            pos++;
                            continue;
                        }
                        if (ch === 44 /* comma */) {
                            pos++;
                            continue;
                        }
                        let hasSource = false;
                        let hasName = false;
                        generatedCharacter += base64VLQFormatDecode();
                        if (hasReportedError())
                            return stopIterating();
                        if (generatedCharacter < 0)
                            return setErrorAndStopIterating("Invalid generatedCharacter found");
                        if (!isSourceMappingSegmentEnd()) {
                            hasSource = true;
                            sourceIndex += base64VLQFormatDecode();
                            if (hasReportedError())
                                return stopIterating();
                            if (sourceIndex < 0)
                                return setErrorAndStopIterating("Invalid sourceIndex found");
                            if (isSourceMappingSegmentEnd())
                                return setErrorAndStopIterating("Unsupported Format: No entries after sourceIndex");
                            sourceLine += base64VLQFormatDecode();
                            if (hasReportedError())
                                return stopIterating();
                            if (sourceLine < 0)
                                return setErrorAndStopIterating("Invalid sourceLine found");
                            if (isSourceMappingSegmentEnd())
                                return setErrorAndStopIterating("Unsupported Format: No entries after sourceLine");
                            sourceCharacter += base64VLQFormatDecode();
                            if (hasReportedError())
                                return stopIterating();
                            if (sourceCharacter < 0)
                                return setErrorAndStopIterating("Invalid sourceCharacter found");
                            if (!isSourceMappingSegmentEnd()) {
                                hasName = true;
                                nameIndex += base64VLQFormatDecode();
                                if (hasReportedError())
                                    return stopIterating();
                                if (nameIndex < 0)
                                    return setErrorAndStopIterating("Invalid nameIndex found");
                                if (!isSourceMappingSegmentEnd())
                                    return setErrorAndStopIterating("Unsupported Error Format: Entries after nameIndex");
                            }
                        }
                        return { value: captureMapping(hasSource, hasName), done };
                    }
                    return stopIterating();
                },
                [Symbol.iterator]() {
                    return this;
                }
            };
            function captureMapping(hasSource, hasName) {
                return {
                    generatedLine,
                    generatedCharacter,
                    sourceIndex: hasSource ? sourceIndex : void 0,
                    sourceLine: hasSource ? sourceLine : void 0,
                    sourceCharacter: hasSource ? sourceCharacter : void 0,
                    nameIndex: hasName ? nameIndex : void 0
                };
            }
            function stopIterating() {
                done = true;
                return { value: void 0, done: true };
            }
            function setError(message) {
                if (error === void 0) {
                    error = message;
                }
            }
            function setErrorAndStopIterating(message) {
                setError(message);
                return stopIterating();
            }
            function hasReportedError() {
                return error !== void 0;
            }
            function isSourceMappingSegmentEnd() {
                return pos === mappings.length || mappings.charCodeAt(pos) === 44 /* comma */ || mappings.charCodeAt(pos) === 59 /* semicolon */;
            }
            function base64VLQFormatDecode() {
                let moreDigits = true;
                let shiftCount = 0;
                let value = 0;
                for (; moreDigits; pos++) {
                    if (pos >= mappings.length)
                        return setError("Error in decoding base64VLQFormatDecode, past the mapping string"), -1;
                    const currentByte = base64FormatDecode(mappings.charCodeAt(pos));
                    if (currentByte === -1)
                        return setError("Invalid character in VLQ"), -1;
                    moreDigits = (currentByte & 32) !== 0;
                    value = value | (currentByte & 31) << shiftCount;
                    shiftCount += 5;
                }
                if ((value & 1) === 0) {
                    value = value >> 1;
                }
                else {
                    value = value >> 1;
                    value = -value;
                }
                return value;
            }
        }