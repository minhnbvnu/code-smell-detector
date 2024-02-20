function testPassingLows() {
    var audiolet = new Audiolet();
    var sine = new Sine(audiolet, 300); // Shouldn't be filtered
    var lpf = new LowPassFilter(audiolet, 5000);
    var recorder = new InputRecorder(audiolet, 1);

    sine.connect(lpf);
    lpf.connect(recorder);

    for (var i=0; i<81920; i++) {
        sine.tick();
        lpf.tick();
        recorder.tick();
    }

    var buffer = recorder.buffers[0][0];
    Assert.assertAudibleValues(buffer);
    Assert.assertValuesReach(buffer); // Check for high amplitude
}