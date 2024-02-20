function getRefactorContext(file, positionOrRange, preferences, formatOptions, triggerReason, kind) {
                const [startPosition, endPosition] = typeof positionOrRange === "number" ? [positionOrRange, void 0] : [positionOrRange.pos, positionOrRange.end];
                return {
                    file,
                    startPosition,
                    endPosition,
                    program: getProgram(),
                    host,
                    formatContext: ts_formatting_exports.getFormatContext(formatOptions, host),
                    // TODO: GH#18217
                    cancellationToken,
                    preferences,
                    triggerReason,
                    kind
                };
            }