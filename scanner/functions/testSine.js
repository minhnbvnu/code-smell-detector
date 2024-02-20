function testSine() {
    var audiolet = new Audiolet();
    var sine = new Sine(audiolet);
    var recorder = new InputRecorder(audiolet, 1);

    sine.connect(recorder);

    for (var i=0; i<81920; i++) {
        sine.tick();
        recorder.tick();
    }

    var buffer = recorder.buffers[0][0];
    Assert.assertContinuous(buffer);
    Assert.assertAudibleValues(buffer);
    Assert.assertValuesInRange(buffer);
}