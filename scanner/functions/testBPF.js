function testBPF() {
    var audiolet = new Audiolet();
    var sine = new Sine(audiolet, 300);
    var bpf = new BandPassFilter(audiolet, 350);
    var recorder = new InputRecorder(audiolet, 1);

    sine.connect(bpf);
    bpf.connect(recorder);

    for (var i=0; i<81920; i++) {
        sine.tick();
        bpf.tick();
        recorder.tick();
    }

    var buffer = recorder.buffers[0][0];
    Assert.assertContinuous(buffer);
    Assert.assertAudibleValues(buffer);
    Assert.assertValuesInRange(buffer);
}