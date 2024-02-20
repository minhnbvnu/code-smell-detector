function generateIntoBuffer(samplesToGenerate, buffer, offset) {
        for (var i = offset; i < offset + samplesToGenerate * 2; i++) {
            buffer[i] = 0;
        }
        for (var i = generators.length - 1; i >= 0; i--) {
            generators[i].generate(buffer, offset, samplesToGenerate);
            if (!generators[i].alive) generators.splice(i, 1);
        }
    }