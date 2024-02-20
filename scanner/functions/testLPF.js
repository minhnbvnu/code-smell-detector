function testLPF() {
    var audiolet = new Audiolet();
    var sine = new Sine(audiolet, 300);
    var lpf = new LowPassFilter(audiolet, 300);
    var recorder = new InputRecorder(audiolet, 1);

    sine.connect(lpf);
    lpf.connect(recorder);

    for (var i=0; i<81920; i++) {
        sine.tick();
        lpf.tick();
        recorder.tick();
    }

    var buffer = recorder.buffers[0][0];
    Assert.assertContinuous(buffer);
    Assert.assertAudibleValues(buffer);
    Assert.assertValuesInRange(buffer);
}