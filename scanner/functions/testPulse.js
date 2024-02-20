function testPulse() {
    var audiolet = new Audiolet();
    var pulse = new Pulse(audiolet);
    var recorder = new InputRecorder(audiolet, 1);

    pulse.connect(recorder);

    for (var i=0; i<81920; i++) {
        pulse.tick();
        recorder.tick();
    }

    var buffer = recorder.buffers[0][0];
    Assert.assertAudibleValues(buffer);
    Assert.assertValuesInRange(buffer);
}