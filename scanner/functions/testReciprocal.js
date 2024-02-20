function testReciprocal() {
    var audiolet = new Audiolet();
    var sine = new Sine(audiolet);
    var mulAdd = new MulAdd(audiolet, 0.5, 1.5); // Values between 1 and 2
    var reciprocal = new Reciprocal(audiolet, 1);
    var recorder = new InputRecorder(audiolet, 1);

    sine.connect(mulAdd);
    mulAdd.connect(reciprocal);
    reciprocal.connect(recorder);

    for (var i=0; i<81920; i++) {
        sine.tick();
        mulAdd.tick();
        reciprocal.tick();
        recorder.tick();
    }

    var buffer = recorder.buffers[0][0];
    Assert.assertContinuous(buffer);
    Assert.assertAudibleValues(buffer);
    Assert.assertValuesInRange(buffer, 0.5, 1);
}