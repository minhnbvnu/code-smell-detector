function testSoftClip() {
    var audiolet = new Audiolet();
    var sine = new Sine(audiolet);
    var softClip = new SoftClip(audiolet);
    var recorder = new InputRecorder(audiolet, 1);

    sine.connect(softClip);
    softClip.connect(recorder);

    for (var i=0; i<81920; i++) {
        sine.tick();
        softClip.tick();
        recorder.tick();
    }

    var buffer = recorder.buffers[0][0];
    Assert.assertContinuous(buffer);
    Assert.assertAudibleValues(buffer);
    Assert.assertValuesInRange(buffer, -0.75, 0.75); // Clipped from -1 -> 1
}