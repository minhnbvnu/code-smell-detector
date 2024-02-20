function testPassingCenter() {
    var audiolet = new Audiolet();
    var sine = new Sine(audiolet, 1000); // Shouldn't be filtered
    var bpf = new BandPassFilter(audiolet, 1000);
    var recorder = new InputRecorder(audiolet, 1);

    sine.connect(bpf);
    bpf.connect(recorder);

    for (var i=0; i<81920; i++) {
        sine.tick();
        bpf.tick();
        recorder.tick();

    }

    var buffer = recorder.buffers[0][0];
    Assert.assertAudibleValues(buffer);
    Assert.assertValuesReach(buffer); // Check for high amplitude
}