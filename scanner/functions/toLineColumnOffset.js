function toLineColumnOffset(fileName, position) {
                if (position === 0) {
                    return { line: 0, character: 0 };
                }
                return sourceMapper.toLineColumnOffset(fileName, position);
            }