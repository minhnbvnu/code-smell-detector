function testHPF() {
    var audiolet = new Audiolet();
    var sine = new Sine(audiolet, 300);
    var hpf = new HighPassFilter(audiolet, 300);
    var recorder = new InputRecorder(audiolet, 1);

    sine.connect(hpf);
    hpf.connect(recorder);

    for (var i=0; i<81920; i++) {
        sine.tick();
        hpf.tick();
        recorder.tick();
    }

    var buffer = recorder.buffers[0][0];
    Assert.assertContinuous(buffer);
    Assert.assertAudibleValues(buffer);
    Assert.assertValuesInRange(buffer);
}