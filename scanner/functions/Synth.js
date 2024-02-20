function Synth(sampleRate) {

    var generators = [];

    function addGenerator(generator) {
        generators.push(generator);
    }

    function generate(samples) {
        var data = new Array(samples * 2);
        generateIntoBuffer(samples, data, 0);
        return data;
    }

    function generateIntoBuffer(samplesToGenerate, buffer, offset) {
        for (var i = offset; i < offset + samplesToGenerate * 2; i++) {
            buffer[i] = 0;
        }
        for (var i = generators.length - 1; i >= 0; i--) {
            generators[i].generate(buffer, offset, samplesToGenerate);
            if (!generators[i].alive) generators.splice(i, 1);
        }
    }

    return {
        'sampleRate': sampleRate,
        'addGenerator': addGenerator,
        'generate': generate,
        'generateIntoBuffer': generateIntoBuffer
    }
}