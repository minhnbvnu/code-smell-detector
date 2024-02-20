function testBRF() {
    var audiolet = new Audiolet();
    var sine = new Sine(audiolet, 300);
    var brf = new BandRejectFilter(audiolet, 300);
    var recorder = new InputRecorder(audiolet, 1);

    sine.connect(brf);
    brf.connect(recorder);

    for (var i=0; i<81920; i++) {
        sine.tick();
        brf.tick();
        recorder.tick();
    }

    var buffer = recorder.buffers[0][0];
    Assert.assertContinuous(buffer);
    Assert.assertAudibleValues(buffer);
    Assert.assertValuesInRange(buffer);
}