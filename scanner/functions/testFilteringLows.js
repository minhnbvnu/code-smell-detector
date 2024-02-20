function testFilteringLows() {
    var audiolet = new Audiolet();
    var sine = new Sine(audiolet, 300); // Should be filtered
    var hpf = new HighPassFilter(audiolet, 5000);
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
    Assert.assertValuesInRange(buffer, -0.1, 0.1); // Check for low amplitude
}